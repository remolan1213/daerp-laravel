import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import CashAdvance from './CashAdvance';

@Entity()
class CashAdvanceDates {
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

export default CashAdvanceDates;