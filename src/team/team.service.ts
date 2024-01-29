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

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const team = await this.teamRepository.save(createTeamDto);
      return team;
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

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const item = await this.teamRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('team not fond');
    } else {
      return this.teamRepository.update({ id }, updateTeamDto);
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
