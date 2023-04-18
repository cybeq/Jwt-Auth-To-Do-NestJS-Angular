import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop()
    status:number;
    @Prop()
    name:string;
    @Prop()
    text:string;
    @Prop()
    description:string;
    @Prop()
    author:string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);