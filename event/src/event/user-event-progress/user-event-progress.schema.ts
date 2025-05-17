import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEventProgressDocument = UserEventProgress & Document;

@Schema()
export class UserEventProgress {
    // 필드 나중에 추가
}

export const UserEventProgressSchema = SchemaFactory.createForClass(UserEventProgress);
