import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import ProductRepository from 'src/DB/Repositories/product.repository';
import { CartModel, productModel, userModel } from 'src/DB/models';
import { CartRespository, UserRepository } from 'src/DB/Repositories';

@Module({
  imports:[productModel, userModel,CartModel],
  controllers: [CartController],
  providers: [CartService,ProductRepository, UserRepository, CartRespository],
})
export class CartModule {}
