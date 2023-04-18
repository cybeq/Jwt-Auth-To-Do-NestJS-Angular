import {Body, Controller, Get, Post} from '@nestjs/common';
import {Task} from "../../models/Task";
import {TaskService} from "../../services/task/task.service";

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post('/create')
    async createCat(@Body() task:Task): Promise<Task> {
        return this.taskService.create(task);
    }
}
