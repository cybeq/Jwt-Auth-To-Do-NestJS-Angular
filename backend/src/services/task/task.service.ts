import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task} from "../../models/Task";
import {Model} from "mongoose";

@Injectable()
export class TaskService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {
    }
    async create(task:Task): Promise<Task>{
        const createdTask = new this.taskModel(task);
        return createdTask.save();
    }
}
