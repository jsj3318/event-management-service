import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {RewardType} from "../../type/rewardType.enum";
import * as mongoose from "mongoose";
import {Document} from "mongoose";

@Schema(
    {
        collection: 'rewards'
    }
)
export class Reward extends Document {
    @Prop({ type: String, enum: Object.values(RewardType), required: true })
    type: RewardType;

    @Prop({ required: true })
    amount: number;

    @Prop()
    unit?: string;

    @Prop()
    itemId?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
    eventId: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
