import {Controller, Get, Post, Body, Param, Delete, HttpCode, Patch} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import {PartialType} from "@nestjs/mapped-types";

export class UpdateRewardDto extends PartialType(CreateRewardDto) {}

@ApiTags('Reward')
@Controller('api/event/:eventId/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @ApiOperation({ summary: '보상 생성' })
  @ApiResponse({ status: 201, description: '보상 생성 완료' })
  @ApiResponse({ status: 404, description: '이벤트 없음' })
  @ApiBody({ type: CreateRewardDto })
  @Post()
  create(
      @Param('eventId') eventId: string,
      @Body() createRewardDto: CreateRewardDto
  ) {
    return this.rewardService.create(eventId, createRewardDto);
  }

  @ApiOperation({ summary: '보상 전체 조회' })
  @ApiResponse({ status: 200, description: '보상 목록 반환' })
  @ApiResponse({ status: 404, description: '이벤트 없음' })
  @Get()
  findAll(
      @Param('eventId') eventId: string,
  ) {
    return this.rewardService.findAll(eventId);
  }

  @ApiOperation({ summary: '보상 삭제' })
  @ApiResponse({ status: 204, description: '보상 삭제 완료' })
  @ApiResponse({ status: 404, description: '보상 없음' })
  @ApiResponse({ status: 400, description: '보상-이벤트 매치 안됨' })
  @HttpCode(204)
  @Delete(':id')
  deleteById(
      @Param('eventId') eventId: string,
      @Param('id') id: string,
  ) {
    return this.rewardService.deleteById(eventId, id);
  }

  @ApiOperation({ summary: '보상 수정' })
  @ApiResponse({ status: 200, description: '보상 수정 완료' })
  @ApiResponse({ status: 404, description: '이벤트 없음' })
  @ApiBody({
    type: UpdateRewardDto,
    examples: {
      default: {
        summary: '수량 변경',
        value: {
          amount: 15
        }
      },
    }
  })
  @Patch(':id')
  updateById(
      @Param('eventId') eventId: string,
      @Param('id') id: string,
      @Body() updateRewardDto: UpdateRewardDto
  ) {
    return this.rewardService.update(eventId, id, updateRewardDto);
  }

}
