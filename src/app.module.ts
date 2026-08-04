import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customCongiguration from './config/custom-congiguration';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis, { Keyv } from '@keyv/redis';

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
}), UserModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService,ConfigService],
})
export class AppModule {}
//
