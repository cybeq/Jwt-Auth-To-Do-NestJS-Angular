import {BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {Task} from "../../models/Task";
import {TaskService} from "../../services/task/task.service";
import {AuthGuard} from "../../core/auth/auth/auth.guard";

import {IAuthRequest} from "../../core/auth/IAuthRequest";

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get('auth')
    async auth(@Req() req:IAuthRequest){
        return true;
    }
    @Get()
    async list(@Req() req:IAuthRequest){
        return await this.taskService.list();
    }
    @Get('/status/list')
    async statusList(@Req() req:IAuthRequest){
        return await this.taskService.statusList();
    }
    @Post('/create')
    async create(@Req() req:IAuthRequest ,@Body() task:Task): Promise<Task> {
        return this.taskService.create(task, req.userId);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id:string): Promise<{status:string, message:string}>{
        if(await this.taskService.delete(id)){
            return {status:"success", message:"task deleted"}
        }
    }
    @Patch('/update/:id')
    async updateTask(@Req() req:IAuthRequest , @Param('id') id: string, @Body() updatedTask: Partial<Task>,): Promise<Task>
    {
        return await this.taskService.update(id, updatedTask, req.userId);
    }
}
