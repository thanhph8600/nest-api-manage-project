import { Task } from 'src/task/entities/task.entity';
import { Team } from 'src/team/entities/team.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  expense: number;

  @Column({ default: 0 })
  spent: number;

  @Column({ default: 0 })
  teamSize: number;

  @Column({ default: 0 })
  totalTask: number;

  @Column({ default: 'processing' })
  status: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Team, (team) => team.project)
  teams: Team[];
  @OneToMany(() => Task, (task) => task.project)
  task: Task[];
}
