import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import {Status} from "./Status";
import {User} from "./User";

@Schema()
export class Task extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Status' , required:true})
    status:Status
    @Prop({required:true})
    name:string;
    @Prop({required:true})
    description:string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true})
    user:User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    updateUser:User

    @Prop({default: Date.now() })
    updateTime:Date;

}

export const TaskSchema = SchemaFactory.createForClass(Task);