import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from "../../models/Task";
import {TaskController} from "../../controllers/task/task.controller";
import {TaskService} from "../../services/task/task.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}