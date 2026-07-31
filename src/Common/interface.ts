import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { TOKEN_TYPES } from "./enums";
import { UserDocument } from "./types";
import { JwtPayload } from 'jsonwebtoken';

export interface IVerifyTokenPayload {
  token: string;
  secret: string;
  options?: JwtVerifyOptions;
}

export interface ICreateCredentialPayload {
  payload: object;
  options: {
    access: JwtSignOptions;
    refresh: JwtSignOptions;
  };
  requiredToken?: TOKEN_TYPES;
}
export interface IGenerateTokenPayload {
  payload: object;
  secret: string;
  options?: JwtSignOptions;
}
export interface ISignatures {
  accessSignature: string;
  accessExpiration: string | undefined;
  refreshSignature: string;
  refreshExpiration: string | undefined;
}

export interface IGetRolePayload {
  role: string;
  tokenType?: TOKEN_TYPES;
  both?: boolean;
}

export interface IDecodeTokenPayload {
  token: string;
  tokenType: TOKEN_TYPES;
}

export interface IDecodeTokenResult {
  user: UserDocument;
  decodedData: JwtPayload| string;
}
