import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const item = await this.taskRepository.save(createTaskDto);
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return this.taskRepository.update({ id }, updateTaskDto);
  }

  async jobTransfer(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.taskRepository.query(
        `UPDATE task SET id_account= ? WHERE id_project = ? AND id_account = ? AND status != 'finished'`,
        [id, updateTaskDto.id_project, updateTaskDto.id_account],
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findByProjectIdAndAccointId(projectId: number, accountId: number) {
    try {
      const result = await this.taskRepository.query(
        `SELECT * FROM task WHERE id_project = ? AND id_account = ?`,
        [projectId, accountId],
      );
      return result;
    } catch (error) {
      return false;
      console.log(error);
    }
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    return this.taskRepository.delete({ id });
  }
}
