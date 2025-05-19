import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Reward, RewardDocument} from "./reward.schema";

@Injectable()
export class RewardService {
  constructor(
      @InjectModel(Reward.name)
      private readonly rewardModel: Model<RewardDocument>,
  ) {
  }

  async create(eventId: string, createRewardDto: CreateRewardDto): Promise<Reward> {
    const created = new this.rewardModel({
      ...createRewardDto,
      eventId,
    });
    return created.save();
  }

  async findAll(eventId: string): Promise<Reward[]> {
    return this.rewardModel.find({eventId});
  }

  async deleteById(eventId: string, id: string): Promise<void> {
    const reward = await this.rewardModel.findById(id);
    if (!reward) {
      throw new NotFoundException('보상을 찾을 수 없습니다.');
    }
    if (reward.eventId.toString() !== eventId) {
      throw new BadRequestException('해당 이벤트에 해당 보상이 존재하지 않습니다.');
    }
    await this.rewardModel.deleteOne({_id: id});
  }

  async update(eventId: string, id: string, updateRewardDto: Partial<CreateRewardDto>): Promise<Reward> {
    const updated = await this.rewardModel.findOneAndUpdate(
        { _id: id, eventId },
        { $set: updateRewardDto },
        { new: true },
    ).exec();

    if (!updated) {
      throw new NotFoundException('보상을 찾을 수 없습니다.');
    }

    return updated;
  }

}
