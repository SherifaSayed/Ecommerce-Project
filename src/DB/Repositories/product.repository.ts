import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ProductDocument } from "src/Common";
import { Product } from "../schemas";
import BaseRepository from "./base.repository";

@Injectable()
class ProductRepository extends BaseRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}

export default ProductRepository;