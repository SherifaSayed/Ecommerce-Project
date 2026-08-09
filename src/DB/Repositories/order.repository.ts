import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from "."
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Order, OrderType}from "../models";
import { OrderStatusEnum, PaymentMethodsEnum } from "src/Common";
    

@Injectable()
export class OrderRespository extends BaseRepository<OrderType> {

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderType>,
  ) {
    super(orderModel);
  }


  async createOrder(data) {
  const newOrder = new this.orderModel({
    userId: Types.ObjectId.createFromHexString(data.userId),
    cartId: Types.ObjectId.createFromHexString(data.cartId),
    totalAmount: data.totalAmount,
    address: data.address,
    phone: data.phone,
    paymentMethod: data.paymentMethod,
  });

  if (newOrder.paymentMethod == PaymentMethodsEnum.CASH)
          newOrder.orderStatus = OrderStatusEnum.PLACED;
   else newOrder.orderStatus=OrderStatusEnum.PENDING;  
   
   return await newOrder.save();
}
}