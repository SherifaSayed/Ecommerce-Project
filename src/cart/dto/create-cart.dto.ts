import { Type } from "class-transformer";
import { IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class AddToCartDto {
  @IsMongoId()
  @Type(() => Types.ObjectId)
  productId: string | Types.ObjectId;

  @IsNumber()
  quantity: number;
}