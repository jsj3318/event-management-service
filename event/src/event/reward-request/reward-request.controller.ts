import {Controller, Get, Query} from '@nestjs/common';
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

  // 유저용
  @Get('me')
  async getMyRewardRequests(
      @Req() req: Request,
      @Param('eventId') eventId: string,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortBy') sortBy: string = 'createdAt',
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
      @Query('isSuccess') isSuccess?: string,
  ): Promise<{ data: any[]; total: number }> {
    const userId = req.headers['x-user-id'];
    const filters: Record<string, any> = { userId };

    if (isSuccess !== undefined) {
      filters.isSuccess = isSuccess === 'true';
    }

    return this.rewardRequestService.findAll(
        eventId,
        page,
        size,
        sortBy,
        sortOrder,
        filters
    );
  }

  // 관리자용
  @Get()
  async getRewardRequestsForAdmin(
      @Param('eventId') eventId: string,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortBy') sortBy: string = 'createdAt',
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
      @Query('userId') userId?: string,
      @Query('isSuccess') isSuccess?: string,
  ): Promise<{ data: any[]; total: number }> {
    const filters: Record<string, any> = {};
    if (userId) filters.userId = userId;
    if (isSuccess !== undefined) filters.isSuccess = isSuccess === 'true';

    return this.rewardRequestService.findAll(
        eventId,
        page,
        size,
        sortBy,
        sortOrder,
        filters
    );
  }



}
