import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Worker from './Worker';

@Entity()
class WorkerNames {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  middlename!: string;
@ManyToOne(() => Worker, worker => worker.names, { onDelete: 'CASCADE', lazy: true })
worker!: Promise<Worker>;
}

export default WorkerNames;
