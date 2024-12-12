import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import CashAdvance from './CashAdvance';

@Entity()
export default class CashAdvanceDates {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dateRequested!: Date;

  @Column({ nullable: true })
  dateGiven!: Date;

  @ManyToOne(() => CashAdvance, cashAdvance => cashAdvance.id, {
    onDelete: 'CASCADE',
  })
  cashAdvance!: CashAdvance;
}


