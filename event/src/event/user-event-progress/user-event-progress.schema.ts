import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventProgressDocument = UserEventProgress & Document;

// 조건 별 진행도
class ConditionProgress {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  target: number;

  @Prop({ required: true, default: 0 })
  current: number;
}

@Schema({ _id: false })
class ConditionProgressSchema extends ConditionProgress {}

// ----------------------------------------------
@Schema(
    {
        collection: 'user_event_progresses',
        timestamps: true,
    }
)
export class UserEventProgress {
    @Prop({ type: String, required: true })
    userId: string;

    @Prop({ type: String, required: true })
    eventId: string;

    @Prop({ type: [ConditionProgressSchema], default: [] })
    conditionProgress: ConditionProgress[];
}

export const UserEventProgressSchema = SchemaFactory.createForClass(UserEventProgress);
