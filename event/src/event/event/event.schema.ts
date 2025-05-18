import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {RewardType} from "../../type/rewardType.enum";

// 이벤트 조건 스키마
class EventCondition {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  value: number;
}

@Schema({ _id: false })
class EventConditionSchema extends EventCondition {}

// 이벤트 보상 스키마
class EventReward {
  @Prop({ type: String, enum: Object.values(RewardType), required: true })
  type: RewardType;

  @Prop({ required: true })
  amount: number;

  @Prop()
  unit?: string;

  @Prop()
  itemId?: string;
}

@Schema({ _id: false })
class EventRewardSchema extends EventReward {}

export type EventDocument = Event & Document;

// ----------------------------------------------
@Schema(
    {
        collection: 'events',
        timestamps: true,
    }
)
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    type: string;

    @Prop()
    description: string;

    @Prop({ type: [EventConditionSchema], default: [] })
    conditions: EventCondition[];

    @Prop({ type: [EventRewardSchema], default: [] })
    rewards: EventReward[];

    @Prop({ required: true })
    startAt: Date;

    @Prop({ required: true })
    endAt: Date;

    @Prop({ default: false })
    isActive: boolean;

}

export const EventSchema = SchemaFactory.createForClass(Event);
