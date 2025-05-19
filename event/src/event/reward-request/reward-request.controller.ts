import {Controller, Get, Query} from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { Post, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiHeader } from '@nestjs/swagger';

@ApiTags('Reward Request')
@Controller('api/event/:eventId/reward-request')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @ApiOperation({ summary: '보상 요청' })
  @ApiResponse({ status: 201, description: '보상 요청 완료' })
  @ApiResponse({ status: 400, description: '이벤트가 진행중이지 않거나, 이미 보상 받은 이벤트일 경우' })
  @Post()
  async requestReward(
      @Req() req: Request,
      @Param('eventId') eventId: string
  ) {
    const userId = req.headers['x-user-id'] as string;

    return this.rewardRequestService.requestReward(userId, eventId);
  }

  // 유저용
  @ApiOperation({ summary: '내 보상 요청 목록 조회' })
  @ApiResponse({ status: 200, description: '보상 요청 목록 반환' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'isSuccess', required: false, type: Boolean })
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
  @ApiOperation({ summary: '보상 요청 목록 조회 (관리자)' })
  @ApiResponse({ status: 200, description: '보상 요청 목록 반환' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'isSuccess', required: false, type: Boolean })
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
