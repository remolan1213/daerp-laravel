import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Worker from './Worker';

@Entity()
class CashAdvance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  remainAmount!: number;

  @Column()
  status!: string;

  @ManyToOne(() => Worker, worker => worker.cashAdvances, { onDelete: 'CASCADE' })
  worker!: Worker[];
}

export default CashAdvance;
