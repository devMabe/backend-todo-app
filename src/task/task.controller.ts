import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from 'src/dto/create.task.dto';
import { UpdateTaskDto } from 'src/dto/update.task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  public async getTasks() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public async getTask(@Param('id') id: string) {
    const task = await this.taskService.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Post()
  public async createTask(@Body() createTask: CreateTaskDTO) {
    try {
      return await this.taskService.create(createTask);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task al ready exist');
      }
      throw error;
    }
  }

  @Put('/:id')
  public async updateTask(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    const task = await this.taskService.update(id, updateTask);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Delete('/:id')
  @HttpCode(204)
  public async deleteTask(@Param('id') id: string) {
    const task = await this.taskService.delete(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
