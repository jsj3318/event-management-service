import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEventProgressService } from '../user-event-progress/user-event-progress.service';
import {RewardRequest, RewardRequestDocument} from "./reward-request.schema";
import {EventService} from "../event/event.service";

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name)
    private readonly rewardRequestModel: Model<RewardRequestDocument>,
    private readonly eventService: EventService,
    private readonly userEventProgressService: UserEventProgressService,
  ) {}

  //   특정 유저의 보상 요청
  async requestReward(userId: string, eventId: string): Promise<RewardRequest> {

    // 이벤트 진행 중인지 검사
    const isActive = await this.eventService.isActive(eventId);
    if(isActive === false){
      throw new BadRequestException('진행 중인 이벤트가 아닙니다.');
    }

    // 이미 보상 받은 유저인지 확인
    if(await this.hasAlreadyReceived(userId, eventId)){
      throw new BadRequestException('이미 보상을 받은 이벤트 입니다!');
    }

    const isComplete = await this.userEventProgressService.isCompleteEvent(userId, eventId);

    const rewardRequest = new this.rewardRequestModel({
      userId,
      eventId,
      isSuccess: isComplete,
    });

    return rewardRequest.save();
  }

  // 특정 유저가 특정 이벤트의 보상을 이미 받았는지 확인
  async hasAlreadyReceived(userId: string, eventId: string): Promise<boolean> {
    const existing = await this.rewardRequestModel.findOne({
      userId,
      eventId,
      isSuccess: true,
    });
    return !!existing;
  }

  async findAll(
    eventId: string,
    page: number = 1,
    size: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filters: Record<string, any> = {},
  ): Promise<{ data: RewardRequest[]; total: number }> {
    const skip = (page - 1) * size;
    const query = { eventId, ...filters };

    const [data, total] = await Promise.all([
      this.rewardRequestModel
        .find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(size)
        .exec(),
      this.rewardRequestModel.countDocuments(query),
    ]);

    return { data, total };
  }

}
