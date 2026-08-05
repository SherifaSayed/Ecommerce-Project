import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { UserDocument } from 'src/Common';
import BrandRepository from 'src/DB/Repositories/brand.repository';
import { CategoryRepository } from 'src/DB/Repositories';

@Injectable()
export class BrandService {

  constructor(
  private brandRepo: BrandRepository,
  private categoryRepo: CategoryRepository,
) {}
 async create(body: CreateBrandDto, user: UserDocument) {
  const { name, description, categoryIds } = body;
  const { _id } = user;

  const brand = await this.brandRepo.findOneDocument({ name });

  if (brand) {
    throw new ConflictException("Brand already exists");
  }

  if (!categoryIds.length) {
    throw new BadRequestException("At least one category is required");
  }

  const validCategories = await this.categoryRepo.findDocuments({
    _id: { $in: categoryIds },
  });

  if (validCategories.length !== categoryIds.length) {
    throw new BadRequestException("Some categories not found");
  }

  return this.brandRepo.creatDocument({
    name,
    description,
    categoryIds,
    createdBy: _id,
  });
}

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand ${JSON.stringify(updateBrandDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
