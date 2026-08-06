import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, User} from 'src/Common/Decorators';
import { UserRole } from 'src/Common';
import type {UserDocument} from 'src/Common'
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(UserRole.ADMIN)
  @UseInterceptors(FilesInterceptor('images',4, multerConfig))
  create(@Body() body: CreateProductDto,@User()user:UserDocument, @UploadedFiles()files?:Express.Multer.File[],
   ) {
    console.log(body);
    return this.productService.create(body,user,files);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
