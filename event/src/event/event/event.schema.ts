import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// 이벤트 조건 스키마
class EventCondition {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  value: number;
}

@Schema({ _id: false })
class EventConditionSchema extends EventCondition {}


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

    @Prop({ required: true })
    startAt: Date;

    @Prop({ required: true })
    endAt: Date;

    @Prop({ default: false })
    isActive: boolean;

}

export const EventSchema = SchemaFactory.createForClass(Event);
