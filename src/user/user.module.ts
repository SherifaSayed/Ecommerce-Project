import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenService } from 'src/Common/Services';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/DB/Repositories';
import { userModel } from 'src/DB/models';
import { AuthGuard } from 'src/Guards';

@Module({
  imports:[userModel],
  controllers: [UserController],
  providers: [UserService, TokenService, JwtService, UserRepository,AuthGuard],
})
export class UserModule {}
