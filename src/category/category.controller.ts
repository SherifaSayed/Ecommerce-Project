import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth, User } from 'src/Common/Decorators';
import {  UserRole } from 'src/Common';
import type {UserDocument} from '../Common'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  create(@Body() body: CreateCategoryDto, @User()user:UserDocument) {
    return this.categoryService.create(body,user);
  }

  @Get()
findAll(
@Query('name') name: string
) {
  return this.categoryService.findAll(name?{ name }:{});
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
