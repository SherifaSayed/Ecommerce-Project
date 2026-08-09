import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Types } from 'mongoose';

import { TokenService } from 'src/Common/Services';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealTimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly tokenService: TokenService) {}

  private clients: Map<string, string> = new Map();

  @WebSocketServer()
  io: Server;

  //================================ Way One to handle client [ registration - disconnection ] =================================

  async handleConnection(socket: Socket) {
    const accesstoken = socket.handshake.auth.accesstoken;

    const { user } =
      await this.tokenService.validateAndVerifyToken(accesstoken);

    this.clients.set(user._id.toString(), socket.id);
  }

  async handleDisconnect(socket: Socket) {
    const accesstoken = socket.handshake.auth.accesstoken;

    const { user } =
      await this.tokenService.validateAndVerifyToken(accesstoken);

    this.clients.delete(user._id.toString());
  }

  emitProductStockUpdate(
    productId: Types.ObjectId | string,
    newStock: number,
  ) {
    this.io.emit('product-stock-updated', { productId, newStock });
  }
}