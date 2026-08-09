import { Module } from '@nestjs/common';
import { RealTimeGateway } from './websocket.gateway';
import { TokenService } from 'src/Common/Services';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RealTimeGateway],
  exports: [RealTimeGateway],
})
export class GatewayModule {}