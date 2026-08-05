import { BrandDocument } from "src/Common";
import BaseRepository from "./base.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Brand } from "../schemas";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
class BrandRepository extends BaseRepository<BrandDocument> {
  constructor(
    @InjectModel(Brand.name)
    private brandModel: Model<BrandDocument>,
  ) {
    super(brandModel);
  }
}

export default BrandRepository;