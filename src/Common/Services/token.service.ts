import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import {
  ICreateCredentialPayload,
  IDecodeTokenPayload,
  IDecodeTokenResult,
  IGenerateTokenPayload,
  IGetRolePayload,
  ISignatures,
  IVerifyTokenPayload,
  TOKEN_TYPES,
  UserDocument,
  UserRole,
} from '..';
import { UserRepository } from 'src/DB/Repositories';

@Injectable()
export default class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  generateToken({
    payload,
    secret,
    options,
  }: IGenerateTokenPayload): string {
    return this.jwtService.sign(payload as object, {
      secret,
      ...(options as JwtSignOptions),
    });
  }

  verifyToken({
    token,
    secret,
    options,
  }: IVerifyTokenPayload): JwtPayload | string {
    return this.jwtService.verify(token, {
      secret,
      ...(options as JwtVerifyOptions),
    });
  }

  createLoginCredentials({
    payload,
    options,
    requiredToken,
  }: ICreateCredentialPayload) {
    const signatures = this.getSignatureByTypeAndRole({
      role: (payload as { role: string }).role,
      both: true,
    }) as ISignatures;

    let accessToken: string | undefined;
    let refreshToken: string | undefined;

    switch (requiredToken) {
      case TOKEN_TYPES.ACCESS:
        accessToken = this.generateToken({
          payload,
          secret: signatures.accessSignature,
          options: options.access,
        });
        break;

      case TOKEN_TYPES.REFRESH:
        refreshToken = this.generateToken({
          payload,
          secret: signatures.refreshSignature,
          options: options.refresh,
        });
        break;

      default:
        accessToken = this.generateToken({
          payload,
          secret: signatures.accessSignature,
          options: options.access,
        });

        refreshToken = this.generateToken({
          payload,
          secret: signatures.refreshSignature,
          options: options.refresh,
        });
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async decodeToken({
    token,
    tokenType,
  }: IDecodeTokenPayload): Promise<IDecodeTokenResult> {
    const decoded = this.jwtService.decode(token);

    const role = (decoded as { role: string })?.role;

    if (!role) {
      throw new BadRequestException('Invalid payload');
    }

    const signature = this.getSignatureByTypeAndRole({
      role,
      tokenType,
    }) as string;

    const decodedData = this.verifyToken({
      token,
      secret: signature,
    });

    const _id = (decodedData as UserDocument)?._id;

    if (!_id) {
      throw new BadRequestException('Invalid payload');
    }

    const user = await this.userRepository.findDocumentById(_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user,
      decodedData,
    };
  }

  private detectSignatureByRole({
    role,
  }: {
    role: string;
  }): ISignatures {
    return this.configService.get<ISignatures>(
      role === UserRole.ADMIN
        ? 'jwt.admin'
        : 'jwt.user',
    )!;
  }

  getSignatureByTypeAndRole({
    role,
    tokenType,
    both = false,
  }: IGetRolePayload): string | ISignatures {
    const signatures = this.detectSignatureByRole({
      role,
    });

    if (both) {
      return signatures;
    }

    let tokenSignature: string;

    switch (tokenType) {
      case TOKEN_TYPES.ACCESS:
        tokenSignature = signatures.accessSignature;
        break;

      case TOKEN_TYPES.REFRESH:
        tokenSignature = signatures.refreshSignature;
        break;

      default:
        throw new BadRequestException('Invalid token type');
    }

    return tokenSignature;
  }
}