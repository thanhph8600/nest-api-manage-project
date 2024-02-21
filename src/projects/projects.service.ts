import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = await this.projectRepository.save(createProjectDto);
      return project;
    } catch (error) {
      throw new InternalServerErrorException('not save');
    }
  }

  async findAll() {
    const projects = await this.projectRepository.find();
    return projects;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not fout');
    }
    return project;
  }

  async getRevenue(year: number) {
    const revenue = await this.projectRepository.query(
      `SELECT MONTH(updatedAt) AS month, SUM(expense) AS total_revenue 
      FROM projects 
      WHERE YEAR(updatedAt) = 2024 AND projects.status = 'done'
      GROUP BY MONTH(updatedAt) 
      ORDER BY MONTH(updatedAt) ;`,
      [year],
    );
    return revenue;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not fout');
    }
    return this.projectRepository.update({ id }, updateProjectDto);
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not fout');
    }
    return this.projectRepository.delete({ id });
  }
}
