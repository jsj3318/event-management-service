import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema(
    {
        collection: 'rewards',
        timestamps: true,
    }
)
export class Reward {
    // 필드 나중에 추가
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
