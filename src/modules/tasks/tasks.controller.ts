/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
    UseGuards,
    Request
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task as TaskModel } from './task.model';
import { TaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')

export class TasksController {
    constructor(private readonly taskService: TasksService) { }
    // @UseGuards(AuthGuard('local'))
    // @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        // get all tasks in the db
        return await this.taskService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TaskModel> {
        // find the task with this id
        const task = await this.taskService.findOne(id);

        // if the task doesn't exit in the db, throw a 404 error
        if (!task) {
            throw new NotFoundException('This Task doesn\'t exist');
        }

        // if task exist, return the task
        return task;
    }

    @Post()
    async create(@Body() task: TaskDto, @Request() req): Promise<TaskModel> {
        // create a new task and return the newly created task
        return await this.taskService.create(task, req.user.id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() task: TaskDto, @Request() req): Promise<TaskModel> {
        // get the number of row affected and the updated task
        const { numberOfAffectedRows, updatedTask } = await this.taskService.update(id, task, req.user.id);

        // if the number of row affected is zero, 
        // it means the task doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Task doesn\'t exist');
        }

        // return the updated task
        return updatedTask;
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // delete the task with this id
        const deleted = await this.taskService.delete(id, req.user.id);

        // if the number of row affected is zero, 
        // then the task doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Task doesn\'t exist');
        }


        return 'Successfully deleted';
    }
}