import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
