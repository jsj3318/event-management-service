import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Reward, RewardSchema} from "./reward.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema  }])
  ],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService]
})
export class RewardModule {}
