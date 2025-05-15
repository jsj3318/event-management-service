import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {ProxyController} from "./proxy/proxy.controller";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./middleware/JwtStrategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      PassportModule
  ],
  controllers: [
      AppController,
    ProxyController
  ],
  providers: [
      AppService,
      JwtStrategy
  ],
})
export class AppModule {}
