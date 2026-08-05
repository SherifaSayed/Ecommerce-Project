import { MongooseModule } from "@nestjs/mongoose";
import { Brand, BrandSchema } from "../schemas";

export const brandModel = MongooseModule.forFeature([
  {
    name: Brand.name,
    schema: BrandSchema,
  },
]);