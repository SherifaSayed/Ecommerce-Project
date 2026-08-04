import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "../schemas";

export const categoryModel = MongooseModule.forFeature([
  {
    name: Category.name,
    schema: CategorySchema,
  },
]);