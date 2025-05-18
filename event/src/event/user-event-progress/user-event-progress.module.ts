import { Module } from '@nestjs/common';
import { UserEventProgressController } from './user-event-progress.controller';
import { UserEventProgressService } from './user-event-progress.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserEventProgress, UserEventProgressSchema} from "./user-event-progress.schema";
import {EventModule} from "../event/event.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEventProgress.name, schema: UserEventProgressSchema }]),
      EventModule
  ],
  controllers: [UserEventProgressController],
  providers: [UserEventProgressService],
  exports: [UserEventProgressService]
})
export class UserEventProgressModule {}
