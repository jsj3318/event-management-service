import { Controller, Patch, Param, Body, Get, NotFoundException } from '@nestjs/common';
import { IncreaseConditionProgressDto } from './dto/increase-condition-progress.dto';
import { UserEventProgressService } from './user-event-progress.service';

@Controller('api/event/:eventId/user/:userId/progress')
export class UserEventProgressController {
  constructor(private readonly userEventProgressService: UserEventProgressService) {}

  @Patch()
  async increaseConditionProgress(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @Body() dto: IncreaseConditionProgressDto
  ) {
    return this.userEventProgressService.increaseConditionProgress(
      userId,
      eventId,
      dto.type,
      dto.amount
    );
  }

  @Get()
  async getUserEventProgress(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string
  ) {
    return this.userEventProgressService.getUserEventProgress(userId, eventId);
  }

}
