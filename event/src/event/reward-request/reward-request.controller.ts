import { Controller } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/event/:eventId/reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  async requestReward(
      @Req() req: Request,
      @Param('eventId') eventId: string
  ) {
    const userId = req.headers['x-user-id'] as string;

    return this.rewardRequestService.requestReward(userId, eventId);
  }



}
