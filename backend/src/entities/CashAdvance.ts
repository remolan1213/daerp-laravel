import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import Worker from './Worker';

@Entity()
export default class CashAdvance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  dateRequested!: Date;

  @Column()
  dateGiven!: Date;

  @Column()
  status!: string;

  @ManyToOne(() => Worker, (worker) => worker.cashAdvances, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  worker!: Relation<Worker>;
}
