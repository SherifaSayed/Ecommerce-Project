import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import ProductRepository from 'src/DB/Repositories/product.repository';
import { brandModel, productModel } from 'src/DB/models';
import { BrandRepository } from 'src/DB/Repositories';

@Module({
  imports:[productModel, brandModel],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, BrandRepository],
})
export class ProductModule {}
