import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectsController } from 'src/projects/projects.controller';
import { TaskController } from 'src/task/task.controller';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), ProjectsModule, TaskModule],
  controllers: [TeamController],
  providers: [TeamService, ProjectsController, TaskController],
  exports: [TeamService],
})
export class TeamModule {}
