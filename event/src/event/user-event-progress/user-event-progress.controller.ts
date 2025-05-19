import { Controller, Patch, Param, Body, Get, NotFoundException } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiParam, ApiTags} from '@nestjs/swagger';
import { IncreaseConditionProgressDto } from './dto/increase-condition-progress.dto';
import { UserEventProgressService } from './user-event-progress.service';

@ApiTags('User Event Progress')
@Controller('api/event/:eventId/user/:userId/progress')
export class UserEventProgressController {
  constructor(private readonly userEventProgressService: UserEventProgressService) {}


  @Patch()
  @ApiOperation({ summary: '조건 진행도 증가' })
  @ApiResponse({ status: 200, description: '진행도 증가 성공' })
  @ApiResponse({ status: 400, description: '이벤트 진행 중 아니거나, 증가하려는 조건 타입 없음' })
  @ApiResponse({ status: 404, description: '이벤트 없음' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'userId', description: '유저 ID' })
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
  @ApiOperation({ summary: '특정 유저의 이벤트 조건 진행도 조회' })
  @ApiResponse({ status: 200, description: '진행도 조회 성공' })
  @ApiResponse({ status: 404, description: '진행도 없음' })
  @ApiParam({ name: 'eventId', description: '이벤트 ID' })
  @ApiParam({ name: 'userId', description: '유저 ID' })
  async getUserEventProgress(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string
  ) {
    return this.userEventProgressService.getUserEventProgress(userId, eventId);
  }

}
