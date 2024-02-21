import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly projectService: ProjectsService,
    private readonly taskService: TaskService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const project = await this.projectService.findOne(
        createTeamDto.id_project,
      );
      const teams = await this.teamRepository.find({
        where: { id_project: createTeamDto.id_project },
      });
      if (teams.length == project.teamSize) {
        throw new InternalServerErrorException(
          'Team size is full, please create new project',
        );
      }
      const checkTeam = teams.find((item) => {
        return item.id_account == createTeamDto.id_account;
      });
      if (checkTeam) {
        throw new InternalServerErrorException(
          'This account is already in the team',
        );
      }
      const user = await this.teamRepository.save(createTeamDto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.teamRepository.find();
  }

  async findOne(id: number) {
    const item = await this.teamRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('team not fond');
    }
    return `This action returns a #${id} team`;
  }

  async findByIdProject(id_project: number) {
    try {
      const result = await this.teamRepository.query(
        `
        SELECT accounts.id, accounts.name, accounts.role, accounts.email, accounts.area, team.status as teamStatus,
          COUNT(task.name) AS sumTask, team.id_account, accounts.position, team.id AS id_team,
          CASE 
            WHEN SUM(CASE WHEN task.status != 'finished' THEN 1 ELSE 0 END) > 0 THEN 'busy' 
            ELSE 'finished' 
          END AS status_summary
          FROM 
            accounts 
            LEFT JOIN team ON accounts.id = team.id_account 
            LEFT JOIN projects ON team.id_project = projects.id 
            LEFT JOIN task ON task.id_account = accounts.id AND task.id_project = projects.id
          WHERE 
            projects.id = ?
          GROUP BY 
            accounts.id;
          `,
        [id_project],
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findByIdAccount(idAccount: number) {
    try {
      const result = await this.teamRepository.query(
        `SELECT * FROM team WHERE id_account = ?`,
        [idAccount],
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const item = await this.teamRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('team not fond');
    } else {
      return this.teamRepository.update({ id }, updateTeamDto);
    }
  }
  async updateJobTransfer(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      const checkTask = await this.taskService.findByProjectIdAndAccointId(
        updateTeamDto.id_project,
        updateTeamDto.id_account,
      );
      if (checkTask.length > 0) {
        this.updateStatus(updateTeamDto.id, 'off');
      } else {
        await this.teamRepository.delete({ id: updateTeamDto.id });
      }

      const check = await this.teamRepository.query(
        `SELECT * FROM team WHERE id_project = ? AND id_account = ?`,
        [updateTeamDto.id_project, id],
      );
      if (check.length == 0) {
        this.teamRepository.create(updateTeamDto);
        const result = await this.teamRepository.query(
          `INSERT INTO team(id_project, id_account, role) VALUES (?, ?, 'staff')`,
          [updateTeamDto.id_project, id],
        );
        return result;
      } else {
        this.updateStatus(check[0].id, '');
      }
      return check;
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(id: number, status: string) {
    const item = await this.teamRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('team not fond');
    } else {
      return this.teamRepository.query(
        `UPDATE team SET status = ? WHERE id = ?`,
        [status, id],
      );
    }
  }

  async remove(id: number) {
    const item = await this.teamRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('team not fond');
    }
    return this.teamRepository.delete({ id });
  }
}
