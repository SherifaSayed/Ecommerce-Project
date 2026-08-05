import { HydratedDocument } from "mongoose";
import { User } from "src/DB/schemas/user.schema";
import { Category } from "src/DB/schemas/category.schema";
import { Brand } from "src/DB/schemas/brand.schema";
// import { Product } from "src/DB/Schemas/product.schema";

export type UserDocument = HydratedDocument<User>;
export type CategoryDocument = HydratedDocument<Category>;
export type BrandDocument = HydratedDocument<Brand>;
// export type ProductDocument = HydratedDocument<Product>;