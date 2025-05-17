import { Module } from '@nestjs/common';
import { UserEventProgressController } from './user-event-progress.controller';
import { UserEventProgressService } from './user-event-progress.service';

@Module({
  controllers: [UserEventProgressController],
  providers: [UserEventProgressService],
  exports: [UserEventProgressService]
})
export class UserEventProgressModule {}
