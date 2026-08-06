import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserDocument } from 'src/Common';
import { CategoryRepository } from 'src/DB/Repositories';
import { FileService } from 'src/Common/Services';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepo: CategoryRepository,
    private fileService:FileService
  ) {}

  async create(body: CreateCategoryDto, user: UserDocument ,file :Express.Multer.File) {
    const { name, description } = body;
    const { _id } = user;

    // check name duplication
    const category = await this.categoryRepo.findOneDocument({ name });

    if (category) {
      throw new ConflictException('Category already exists');
    }
  const categoryInstaance= new this.categoryRepo.categoryModel({
  name,
  description,
  createdBy: _id,
})
    let uploadedDatat;
  if(file)
  {
    uploadedDatat= await this.fileService.uploadFile(file,`categories/${categoryInstaance._id as unknown as string}`);
    categoryInstaance.logo=uploadedDatat.key;
  }
   const newCategory= await categoryInstaance.save()
 return {newCategory, uploadedDatat};
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
