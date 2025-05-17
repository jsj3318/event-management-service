import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConditionDocument = Condition & Document;

@Schema()
export class Condition {
    // 필드 나중에 추가
}

export const ConditionSchema = SchemaFactory.createForClass(Condition);
