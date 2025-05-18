import { Module } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {RewardRequest, RewardRequestSchema} from "./reward-request.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }])
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
  exports: [RewardRequestService]
})
export class RewardRequestModule {}
