import { CategoryDocument } from "src/Common";
import BaseRepository from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../schemas/category.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
class CategoryRepository extends BaseRepository<CategoryDocument> {
  constructor(
    @InjectModel(Category.name)
    public categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}

export default CategoryRepository;