import { Account } from 'src/accounts/entities/account.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_project: number;

  @Column()
  id_account: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  finishDate: Date;

  @Column()
  status: string;

  @ManyToOne(() => Account, (account) => account.task)
  @JoinColumn({ name: 'id_account' })
  account: Account;

  @ManyToOne(() => Project, (project) => project.task)
  @JoinColumn({ name: 'id_project' })
  project: Project;
}
