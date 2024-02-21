import { Account } from 'src/accounts/entities/account.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'team' })
@Unique(['id_account', 'id_project'])
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_project: number;

  @Column()
  id_account: number;

  @Column()
  role: string;

  @Column()
  status: string;

  @ManyToOne(() => Account, (account) => account.teams)
  @JoinColumn({ name: 'id_account' })
  account: Account;

  @ManyToOne(() => Project, (project) => project.teams)
  @JoinColumn({ name: 'id_project' })
  project: Project;
}
