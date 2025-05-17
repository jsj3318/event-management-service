import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { EventModule } from './event/event/event.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "node:process";
import {RewardModule} from "./event/reward/reward.module";
import {ConditionModule} from "./event/condition/condition.module";
import {UserConditionProgressModule} from "./event/user-condition-progress/user-condition-progress.module";
import {UserEventProgressModule} from "./event/user-event-progress/user-event-progress.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      MongooseModule.forRoot(process.env.MONGODB_URI),

      EventModule,
      RewardModule,
      ConditionModule,
      UserConditionProgressModule,
      UserEventProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
