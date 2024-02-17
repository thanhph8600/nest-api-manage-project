import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { ProjectsController } from 'src/projects/projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), ProjectsModule],
  controllers: [TeamController],
  providers: [TeamService, ProjectsController],
  exports: [TeamService],
})
export class TeamModule {}
