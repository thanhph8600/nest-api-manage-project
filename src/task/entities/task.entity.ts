import { Account } from 'src/accounts/entities/account.entity';
import { Project } from 'src/projects/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
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
  description: string;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  finishDate: Date;

  @BeforeInsert()
  setStartDateDefaultValue() {
    if (!this.startDate) {
      this.startDate = new Date(); // Thiết lập giá trị mặc định là ngày hiện tại trước khi thêm mới
    }
  }

  @ManyToOne(() => Account, (account) => account.task)
  @JoinColumn({ name: 'id_account' })
  account: Account;

  @ManyToOne(() => Project, (project) => project.task)
  @JoinColumn({ name: 'id_project' })
  project: Project;
}
