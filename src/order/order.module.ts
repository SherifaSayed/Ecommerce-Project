import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartService } from 'src/cart/cart.service';
import { OrderRespository } from 'src/DB/Repositories/order.repository';
import { CartModel, orderModel, productModel } from 'src/DB/models';
import { CartRespository } from 'src/DB/Repositories';
import ProductRepository from 'src/DB/Repositories/product.repository';
import { StripeService } from './Payment/Services';
import { RealTimeGateway } from 'src/GateWays/websocket.gateway';

@Module({
  imports:[orderModel, CartModel, productModel],
  controllers: [OrderController],
  providers: [OrderService, CartService,CartRespository,ProductRepository, OrderRespository, StripeService,RealTimeGateway],
  exports: [OrderService, CartService,CartRespository,ProductRepository, OrderRespository, StripeService,RealTimeGateway]
})
export class OrderModule {}
