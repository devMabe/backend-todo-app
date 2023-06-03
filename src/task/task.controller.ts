import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
    return this.taskService.findOne(id);
  }

  @Post()
  public async createTask(@Body() createTask: CreateTaskDTO) {
    return this.taskService.create(createTask);
  }

  @Put('/:id')
  public async updateTask(
    @Param('id') id: string,
    @Body() updateTask: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTask);
  }

  @Delete('/:id')
  public async deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
