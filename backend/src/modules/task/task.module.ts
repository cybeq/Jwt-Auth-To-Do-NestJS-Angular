import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from "../../models/Task";
import {TaskController} from "../../controllers/task/task.controller";
import {TaskService} from "../../services/task/task.service";
import {JwtService} from "@nestjs/jwt";
import {Status, StatusSchema} from "../../models/Status";
import {User, UserSchema} from "../../models/User";



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        MongooseModule.forFeature([{ name: Status.name, schema: StatusSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [TaskController],
    providers: [TaskService, JwtService],
})
export class TaskModule {}