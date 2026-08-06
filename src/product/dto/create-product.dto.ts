import { isValidObjectId, Types } from "mongoose";
import {
  IsString,
  IsNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  Max,
  IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

@ValidatorConstraint({ name: "confirmationPassword", async: false })
class IsValidObjectId implements ValidatorConstraintInterface {
  validate(value: any) {
    return isValidObjectId(value);
  }

  defaultMessage(): string {
    return "Invalid ObjectId";
  }
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({value})=>Number (value))
  @IsNumber()
  basePrice: number;

 @IsOptional()
  @Transform(({ value }) =>value? Number(value):0) 
  @IsNumber()
  @Max(100)
  discount: number;

  @Transform(({value})=>Number (value))
  @IsNumber()
  stock: number;

  @Validate(IsValidObjectId)
  category: Types.ObjectId;

  @Validate(IsValidObjectId)
  brand: Types.ObjectId;
}