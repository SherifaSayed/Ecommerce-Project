import { Document, HydratedDocument, Types } from "mongoose";
 import {Product ,User} from "../schemas";
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Cart } from "./cart.model";
import { OrderStatusEnum, PaymentMethodsEnum } from "src/Common";

@Schema({ timestamps: true })
export class Order {

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: string | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Cart.name, required: true })
  cartId: string | Types.ObjectId;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  // couponId

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  phone: string; 
   
@Prop({ type: String, enum: PaymentMethodsEnum, required: true })
paymentMethod: string;

@Prop({ type: String, enum: OrderStatusEnum, required: true })
orderStatus: string;

@Prop({type: Date,required: true,default: () => Date.now() + 7 * 24 * 60 * 60 * 1000})
  arrivesAt: Date;

@Prop({type:{
  paidAt:Date,
  deliverdAt:Date,
  deliveredBy:{type:Types.ObjectId, ref:User.name},
  refundAt:Date,
  refundBy:{type:Types.ObjectId,ref:User.name},
  cancelledAt:Date,
  cancelledBy:{type:Types.ObjectId, ref:User.name}
}})
  orderChanges:object;
  @Prop({type:String})
  paymentIntent:string
}
const orderSchema = SchemaFactory.createForClass(Order);

export const orderModel = MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]);

export type OrderType = HydratedDocument<Order> & Document;