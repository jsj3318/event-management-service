import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "node:process";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
