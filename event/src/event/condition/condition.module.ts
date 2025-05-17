import { Module } from '@nestjs/common';
import { ConditionController } from './condition.controller';
import { ConditionService } from './condition.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Condition, ConditionSchema} from "./condition.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Condition.name, schema: ConditionSchema }])
  ],
  controllers: [ConditionController],
  providers: [ConditionService],
  exports: [ConditionService]
})
export class ConditionModule {}
