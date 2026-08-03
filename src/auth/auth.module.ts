import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../DB/Repositories';
import { userModel } from '../DB/models';
import { SecurityService } from '../Common/Services';
import { TokenService } from 'src/Common/Services';
import { JwtService } from '@nestjs/jwt';
import { LoggerMiddleWare } from 'src/MiddleWares';

@Module({
  imports:[userModel],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, SecurityService,TokenService,JwtService],
})
export class AuthModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
  
      consumer.apply(LoggerMiddleWare).forRoutes({path:'/auth/signIN', method:RequestMethod.POST})
    
  }
}
