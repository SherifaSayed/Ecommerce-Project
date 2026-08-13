import { Resolver, Query } from "@nestjs/graphql";
import { OrderService } from "src/order/order.service";
import { OrderObject } from "../Types/order.types";


@Resolver()
export class OrderResolver {

    constructor(private orderService: OrderService) { }

    @Query(() => String, { name: 'RootQueryResolver', description: 'test desc' })
    rootQueryResolver() {
        return 'test'
    }


    @Query(() => Number, { name: "RootQueryNumber", description: "return number" })
    rootQueryNumber() {
        return 23
    }

    @Query(() => [OrderObject], { name: "ListOrders", description: 'get all orders' })
    async listOrders() {
        return await this.orderService.getOrders()
    }

}