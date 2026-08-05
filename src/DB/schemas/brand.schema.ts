import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import slugify from "slugify";

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Brand {

  @Prop({
    required: true,
    index: {
      name: "idx_brand_unique",
      unique: true,
    },
  })
  name: string;

  @Prop({
    required: true,
    index: {
      name: "idx_brand_slug_unique",
      unique: true,
    },
    default: function (this: any) {
      return slugify(this.name, {
        lower: true,
        strict: true,
        replacement: "_",
      });
    },
  })
  slug: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "User",
  })
  createdBy:  Types.ObjectId;

  @Prop({
    type: String,
  })
  logo: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop([
    {
      type: Types.ObjectId,
      ref: "Category",
    },
  ])
  categoryIds: Types.ObjectId[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);