import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Worker from './Worker.js';

@Entity('worker_names')
class WorkerNames {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column()
  middlename!: string;

  @ManyToOne(() => Worker, worker => worker.names, { onDelete: 'CASCADE' })
  worker!: Worker;
}

export default WorkerNames;
