import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "../schemas";

export const productModel = MongooseModule.forFeature([
  {
    name: Product.name,
    schema: ProductSchema,
  },
]);