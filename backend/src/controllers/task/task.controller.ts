import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {Task} from "../../models/Task";
import {TaskService} from "../../services/task/task.service";
import {AuthGuard} from "../../core/auth/auth/auth.guard";

import {IAuthRequest} from "../../core/auth/IAuthRequest";

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async talk(@Req() req:IAuthRequest){
        return req.userId;
    }
    @Post('/create')
    async createCat(@Body() task:Task): Promise<Task> {
        return this.taskService.create(task);
    }
}
