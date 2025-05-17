import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventProgressDocument = UserEventProgress & Document;

@Schema(
    {
        collection: 'user_event_progresses',
        timestamps: true,
    }
)
export class UserEventProgress {
    // 필드 나중에 추가
}

export const UserEventProgressSchema = SchemaFactory.createForClass(UserEventProgress);
