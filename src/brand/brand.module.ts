import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import {
  BrandRepository,
  CategoryRepository,
  UserRepository,
} from 'src/DB/Repositories';
import {
  brandModel,
  categoryModel,
  userModel,
} from 'src/DB/models';
import { TokenService } from 'src/Common/Services';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [categoryModel, brandModel, userModel],
  controllers: [BrandController],
  providers: [
    BrandService,
    BrandRepository,
    CategoryRepository,
    UserRepository,
    TokenService,
    JwtService,
  ],
})
export class BrandModule {}