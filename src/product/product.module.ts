import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import ProductRepository from 'src/DB/Repositories/product.repository';
import { brandModel, productModel } from 'src/DB/models';
import { BrandRepository } from 'src/DB/Repositories';
import { FileService } from 'src/Common/Services';
import { GatewayModule } from 'src/GateWays/Gateway.module';
import { RealTimeGateway } from 'src/GateWays/websocket.gateway';

@Module({
  imports:[productModel, brandModel,GatewayModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, BrandRepository, FileService,]
})
export class ProductModule {}
