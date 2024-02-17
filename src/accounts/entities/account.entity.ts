import { Task } from 'src/task/entities/task.entity';
import { Team } from 'src/team/entities/team.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity({ name: 'accounts' })
@Unique(['email'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  address: string;

  @Column()
  area: string;

  @Column({
    default:
      'https://firebasestorage.googleapis.com/v0/b/project-management-dc43a.appspot.com/o/user-image.jpg?alt=media&token=e6fbacef-f723-49e7-881b-815ee31e4eec',
  })
  thumb: string;

  @Column({ default: 'activate' })
  status: string;

  @Column({ default: 'Front end' })
  position: string;

  @OneToMany(() => Team, (team) => team.account)
  teams: Team[];

  @OneToMany(() => Task, (task) => task.account)
  task: Task[];
}
