import { Module } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {RewardRequest, RewardRequestSchema} from "./reward-request.schema";
import {EventModule} from "../event/event.module";
import {UserEventProgressModule} from "../user-event-progress/user-event-progress.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }]),
      EventModule,
      UserEventProgressModule
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
  exports: [RewardRequestService]
})
export class RewardRequestModule {}
