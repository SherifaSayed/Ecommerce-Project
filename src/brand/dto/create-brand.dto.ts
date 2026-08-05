import { Types } from "mongoose";

import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  categoryIds: Types.ObjectId[];
} 