import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "../../models/Task";
import {Model} from "mongoose";
import {Status} from "../../models/Status";


@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
                @InjectModel(Status.name) private statusModel: Model<Status>,

                ) {}
    async create(task:Task, userId:string): Promise<Task>{
        const statusId = (await this.statusModel.findOne({name:"Awaiting"})).id;
        task.status = statusId;
        const createdTask = new this.taskModel(task);
        return createdTask.save();
    }
    async list(): Promise<Task[]>{
        return this.taskModel.find({});
    }
    async delete(_id:string): Promise<boolean>{
        const taskToDelete = await this.taskModel.findOne({_id});
        if(!taskToDelete){
            throw new BadRequestException({context:"task", description:"task does not exist"})
        }
        await this.taskModel.deleteOne({_id})
        return true;
    }
    async update(_id:string, updatedTask:Partial<Task>): Promise<Task>{
        var task;
        try {
            task = await this.taskModel.findOne({_id}) as Task;
        }catch(e){
            throw new NotFoundException({context:"task", message:`Task with id ${_id} not found`});
        }
        try {
            task.name = updatedTask.name;
            task.description = updatedTask.description
            await task.save();
        }catch(e){
            throw new BadRequestException({context:"task", message:"Invalid props"})
        }
        return task.toObject();
    }

}
