import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { EventModule } from './event/event/event.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "node:process";
import {UserEventProgressModule} from "./event/user-event-progress/user-event-progress.module";
import {RewardRequestModule} from "./event/reward-request/reward-request.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      MongooseModule.forRoot(process.env.MONGODB_URI),

      EventModule,
      UserEventProgressModule,
      RewardRequestModule
  ],
})
export class AppModule {}
