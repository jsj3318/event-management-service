import { Module } from '@nestjs/common';
import { UserConditionProgressController } from './user-condition-progress.controller';
import { UserConditionProgressService } from './user-condition-progress.service';

@Module({
  controllers: [UserConditionProgressController],
  providers: [UserConditionProgressService],
  exports: [UserConditionProgressService]
})
export class UserConditionProgressModule {}
