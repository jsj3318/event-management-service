import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema(
    {
        collection: 'reward_requests',
        timestamps: true,
    }
)export class RewardRequest {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true })
    isSuccess: boolean;

    @Prop({ default: '' })
    failureReason?: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
