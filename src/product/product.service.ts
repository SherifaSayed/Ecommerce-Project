import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { UserDocument } from 'src/Common';
import { User } from 'src/Common/Decorators';
import { BrandRepository } from 'src/DB/Repositories';
import { FileService } from 'src/Common/Services';
import ProductRepository from 'src/DB/Repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(private brandRepo:BrandRepository,
    private fileService :FileService,
    private productRepo:ProductRepository
  ){}
  async create(body: CreateProductDto,@User()user:UserDocument,files?:Express.Multer.File[]
   ) {
   const {name,description,basePrice,discount,stock,category,brand,} = body;
   const brandData= await this.brandRepo.findDocumentById(brand,{populate:[{path:'categoryIds',select:'name'}]})
   if (!brandData) {
     throw new NotFoundException("Brand not found");
                   }
const categoryData = brandData.categoryIds.find((c) => c.toString() === category.toString());

if (!categoryData) {
   throw new NotFoundException("Category not found");
  }
  let keys;
let uploadedData;
if (files?.length) {
  uploadedData = await this.fileService.uploadFiles( files,"products",);
    keys = uploadedData.map((file) => file.key);
      }
    
  const product= await this.productRepo.creatDocument({
  name,
  description,
  basePrice,
  discount,
  stock,
  category,
  brand,
  images: keys,
  addedBy:user._id
    });
  return {uploadedData, product}
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
