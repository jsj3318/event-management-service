import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Role} from "../type/role.enum";

@Schema(
    {
        collection: 'users',
        timestamps: true,
    }
)
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role, default: Role.USER })
    role: string;

    @Prop({ required: true, unique: true })
    nickname: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
