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
export class Product {

  @Prop({
    required: true,
  })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    default: function (this:any) {
      return slugify(this.name, {
        lower: true,
        strict: true,
        replacement: "_",
      });
    },
  })
  slug: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ required: true, type: Number })
  basePrice: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({
    type: Number,
    default: function (this: any) {
    
      return this.basePrice - (this.basePrice *( this.discount ||0)/ 100);
    },
  })
  finalPrice: number;

  @Prop({ type: Number, default: 0 })
  stock: number;

  @Prop({
    required: true,
    type: Number,
    enum: [0,1, 2, 3, 4, 5],
    default: 0,
  })
  rating: number;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "User",
  })
  addedBy:  Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "Brand",
  })
  brand:  Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "Category",
  })
  category:  Types.ObjectId;

  @Prop({
    
    type: Types.ObjectId,
    ref: "SubCategory",
  })
  subCategory:  Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);