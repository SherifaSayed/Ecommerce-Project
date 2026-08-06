import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/DB/Repositories';
import { categoryModel, userModel } from 'src/DB/models';
import { FileService, TokenService } from 'src/Common/Services';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/DB/Repositories';
import { S3ClientService } from 'src/Common/Clients';

@Module({
  imports: [categoryModel, userModel],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    TokenService,
    JwtService,
    UserRepository,
    FileService,
    S3ClientService
  ],
})
export class CategoryModule {}