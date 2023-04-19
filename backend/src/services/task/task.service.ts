import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "../../models/Task";
import mongoose, {Model} from "mongoose";
import {Status} from "../../models/Status";
@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>,
                @InjectModel(Status.name) private statusModel: Model<Status>) {}
    async create(task:any, userId:string): Promise<Task>{
        if(!task.status) {
            const statusId = (await this.statusModel.findOne({name: "Awaiting"})).id;
            task.status = statusId;
        }
        task.user = userId;
        task.updateTime = Date.now();
        const createdTask = new this.taskModel(task);
        await createdTask.save();
        return this.taskModel.findOne(createdTask.toObject()).populate('status').populate('user').populate('updateUser');
    }
    async list(): Promise<Task[]>{
        return this.taskModel.find({}).populate('status').populate('user').populate('updateUser').sort([['updateTime', -1]]);
    }
    async statusList(): Promise<Status[]>{
        return this.statusModel.find({})
    }
    async delete(_id:string): Promise<boolean>{
        var task;
        try{
            task = await this.taskModel.findOne({_id});
        }catch(e){
            throw new NotFoundException({context:"task", description:"task does not exist"});
            // 404
        }
        if(!task) throw new NotFoundException({context:"task", description:"task does not exist"});
        //404
        await this.taskModel.deleteOne({_id})
        return true;
    }
    async update(_id:string, updatedTask:Partial<Task>, updatingUserId:string): Promise<Task>{
        var task;
        try {
            task = await this.taskModel.findOne({_id}) as Task;
        }catch(e){
            throw new NotFoundException({context:"task", message:`Task with id ${_id} not found`});
            // 404
        }
        if(!task)   throw new NotFoundException({context:"task", message:`Task with id ${_id} not found`}); //404
        try {
            task.name = updatedTask.name;
            task.description = updatedTask.description
            task.updateUser = updatingUserId;
            task.updateTime = Date.now();
            if(updatedTask.status) task.status = updatedTask.status
            task.save();
        }catch(e){
            throw new BadRequestException({context:"task", message:"Invalid props"})
            //400
        }
        return this.taskModel.findOne(task.toObject()).populate('status').populate('user').populate('updateUser');
    }
}
