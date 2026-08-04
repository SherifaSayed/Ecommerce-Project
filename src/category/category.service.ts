import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserDocument } from 'src/Common';
import { CategoryRepository } from 'src/DB/Repositories';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepo: CategoryRepository
  ) {}

  async create(body: CreateCategoryDto, user: UserDocument) {
    const { name, description } = body;
    const { _id } = user;

    // check name duplication
    const category = await this.categoryRepo.findOneDocument({ name });

    if (category) {
      throw new ConflictException('Category already exists');
    }

    // handle logo
 return this.categoryRepo.creatDocument({
  name,
  description,
  createdBy: _id,
});
}


 findAll(query: any) {
  return this.categoryRepo.findDocuments(query);
}

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
  return `This action updates a #${id} category with ${JSON.stringify(updateCategoryDto)}`;
}

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
