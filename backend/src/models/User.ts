import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
    // @Prop({type: mongoose.Schema.Types.ObjectId, auto: true})
    // id: string;
    @Prop({required:true, unique:true, type: String})
    email:string;
    @Prop({required: true})
    password:string;
    @Prop({required:true})
    name:string;
}

export const UserSchema = SchemaFactory.createForClass(User);