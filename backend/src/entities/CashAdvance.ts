import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Worker from './Worker.js';

@Entity('cash_advance')
class CashAdvance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('decimal')
  amount!: number;

  @Column('decimal')
  remainAmount!: number;

  @Column({ type: 'varchar', default: 'pending' })
  status!: string;

  @ManyToOne(() => Worker, worker => worker.cashAdvances, { onDelete: 'CASCADE' })
  worker!: Worker[];
}

export default CashAdvance;
