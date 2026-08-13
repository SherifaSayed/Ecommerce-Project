import { Module } from "@nestjs/common";
import { OrderResolver } from "./Resolvers/order.resolver";


@Module({
    imports: [],
    controllers: [],
    providers: [OrderResolver],
    exports: [],
})
export class GQLModule { }