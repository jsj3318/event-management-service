import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserConditionProgressDocument = UserConditionProgress & Document;

@Schema()
export class UserConditionProgress {
    // 필드 나중에 추가
}

export const UserConditionProgressSchema = SchemaFactory.createForClass(UserConditionProgress);
