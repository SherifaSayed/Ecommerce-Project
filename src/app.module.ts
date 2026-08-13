import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customCongiguration from './config/custom-configuration';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis, { Keyv } from '@keyv/redis';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { GlobalModule } from './global.module';
import { CartModule } from './cart/cart.module';
// import { GatewayModule } from './GateWays/gateway.module';
import { OrderModule } from './order/order.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GQLModule } from './GraphQl/graphql.module';
import { RealTimeGateway } from './GateWays/websocket.gateway';
import { GatewayModule } from './GateWays/Gateway.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:[`.${process.env.NODE_ENV}.env`, '.env'],
    load:[customCongiguration],
    isGlobal:true
  }),MongooseModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(congifService:ConfigService)=>({
      uri:congifService.get('database.MONGO_URI'),
      onConnectionCreate:(connection:Connection)=>{
        connection.on('connected',()=>console.log("connected on database" ));
        return connection;
      }
    })
  }),GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile:'./src/schema.gql'
}),
CacheModule.registerAsync({
  isGlobal:true,
  useFactory: async () => {
    return {
      stores: [
        new KeyvRedis('redis://localhost:6379'),
      ],
    };
  },
}),GlobalModule, UserModule, AuthModule, CategoryModule, BrandModule, ProductModule, CartModule,
 OrderModule,GQLModule,GatewayModule],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
//
