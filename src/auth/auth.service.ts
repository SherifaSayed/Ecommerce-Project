import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/DB/Repositories';
import { SignUpDto } from './DTO/add.user.dto';
import { SignIn } from './DTO/signInDTO';
import {default as SecurityService} from "../Common/Services/security.service"
import { TokenService } from '../Common/Services/index';
import { UserDocument } from 'src/Common';
import { ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import crypto from 'node:crypto';
@Injectable()
export class AuthService {
  private readonly jwtSecrets;
  constructor(private readonly userRepository: UserRepository,
     private securityService:SecurityService,
    private tokenService:TokenService,
  private configService :ConfigService) {
    this.jwtSecrets= this.configService.get('jwt')
  }
async _checkDuplicates(email: string, phoneNumber: string) {
  const isEmailExists = await this.userRepository.findOneDocument({ email });

  if (isEmailExists) {
    throw new ConflictException('Email already exists');
  }

  // in case of not encrypting phone number before saving
  const isPhoneExists = await this.userRepository.findOneDocument({
    phoneNumber,
  });

  if (isPhoneExists) {
    throw new ConflictException('Phone number already exists');
  }

  return { isEmailExists, isPhoneExists };
}
private _buildTokens(data: Pick<UserDocument, '_id' | 'email' | 'role'>) {
  const tokenPayload = {
    _id: data._id,
    email: data.email,
    role: data.role,
  };

  const { accessToken, refreshToken } =
    this.tokenService.createLoginCredentials({
      payload: tokenPayload,
      options: {
        access: {
          expiresIn: this.jwtSecrets[data.role]
            .accessExpiration as SignOptions['expiresIn'],
          jwtid: crypto.randomUUID(),
        },

        refresh: {
          expiresIn: this.jwtSecrets[data.role]
            .refreshExpiration as SignOptions['expiresIn'],
          jwtid: crypto.randomUUID(),
        },
      },
    });

  return {
    accessToken,
    refreshToken,
  };
}
async signUp(body: SignUpDto) {
  const {
    firstName,
    lastName,
    password,
    gender,
    email,
    phoneNumber,
  } = body;

  // duplication checks
  await this._checkDuplicates(email, phoneNumber);
  return this.userRepository.creatDocument({
  firstName,lastName,password,gender,email, phoneNumber,});
}
async signIn(body:SignIn)
{
  const {email, password}= body;

  const isUser= await this.userRepository.findOneDocument({email});
  if(!isUser)
     throw new NotFoundException("email dose not exsist")
  if(isUser)
  {
  const ispassword= await this.securityService.compare(password,isUser.password)
  if(!ispassword)
     throw new NotFoundException("pasword not right")
  
  }
   return this._buildTokens(isUser)
}
}
