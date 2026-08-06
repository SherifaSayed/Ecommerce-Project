import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/DB/Repositories';
import { categoryModel, userModel } from 'src/DB/models';


@Module({
  imports: [categoryModel],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
  ],
})
export class CategoryModule {}