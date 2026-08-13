import { Resolver, Query, Args } from "@nestjs/graphql";
import { OrderService } from "src/order/order.service";
import { ListOrderFiltersDto, OrderObject } from "../Types/order.types";
import { UsePipes, ValidationPipe } from "@nestjs/common";

@UsePipes(new ValidationPipe({whitelist:true}))
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
    async listOrders(@Args('listOrderFilters')listOrderFilters:ListOrderFiltersDto) {
        return await this.orderService.getOrders(listOrderFilters)
    }

}