import { Module } from '@nestjs/common';
import { UserConditionProgressController } from './user-condition-progress.controller';
import { UserConditionProgressService } from './user-condition-progress.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserConditionProgress, UserConditionProgressSchema} from "./user-condition-progress.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserConditionProgress.name, schema: UserConditionProgressSchema }])
  ],
  controllers: [UserConditionProgressController],
  providers: [UserConditionProgressService],
  exports: [UserConditionProgressService]
})
export class UserConditionProgressModule {}
