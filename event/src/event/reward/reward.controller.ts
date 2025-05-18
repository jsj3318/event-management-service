import {Controller, Get, Post, Body, Param, Delete, HttpCode} from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';

@Controller('api/event/:eventId/reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  create(
      @Param('eventId') eventId: string,
      @Body() createRewardDto: CreateRewardDto
  ) {
    return this.rewardService.create(eventId, createRewardDto);
  }

  @Get()
  findAll(
      @Param('eventId') eventId: string,
  ) {
    return this.rewardService.findAll(eventId);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteById(
      @Param('eventId') eventId: string,
      @Param('id') id: string,
  ) {
    return this.rewardService.deleteById(eventId, id);
  }

}
