import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from 'src/dto/create.task.dto';
import { UpdateTaskDto } from 'src/dto/update.task.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  findAll() {
    return this.taskModel.find();
  }

  async create(createTask: CreateTaskDTO) {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  findOne(id: string) {
    return this.taskModel.findById(id);
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async update(id: string, updateTask: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, updateTask, {
      new: true,
    });
  }
}
