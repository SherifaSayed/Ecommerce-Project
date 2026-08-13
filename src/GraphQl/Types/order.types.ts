import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Types } from "mongoose";
import { OrderStatusEnum, PaymentMethodsEnum } from "src/Common/enums";
import { OrderType } from "src/DB/models/order.model";

registerEnumType(PaymentMethodsEnum, {
    name: 'PaymentMethodEnum'
})

registerEnumType(OrderStatusEnum, {
    name: 'OrderStatusEnum'
})

@ObjectType()
export class OrderObject implements Partial<OrderType> {

    @Field(() => ID, { nullable: false })
    _id: Types.ObjectId;

    @Field(() => ID, { nullable: false })
    userId: Types.ObjectId;

    @Field(() => ID, { nullable: false })
    cartId: string | Types.ObjectId | undefined;

    @Field(() => String, { nullable: false })
    address: string;

    @Field(() => String, { nullable: false })
    phone: string;

    @Field(() => PaymentMethodsEnum, { nullable: false })
    paymentMethod: string;

    @Field(() => Number, { nullable: false })
    totalAmount: number;

    @Field(() => OrderStatusEnum, { nullable: false })
    orderStatus?: string;

    @Field(() => String, { nullable: true })
    paymentIntent?: string;

    // orderChanges?: any;
}