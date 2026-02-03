import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import Worker from './Worker';

@Entity()
export default class Payroll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  payrollPeriod!: string;

  @Column()
  payrollDate!: string;

  @Column({ nullable: true })
  client!: string;

  @Column({ nullable: true })
  client2!: string;

  @Column({ type: "real", default: 0 })
  grossAmount!: number;

  @Column({ type: "real", default: 0 })
  grossAmount2!: number;

  @Column({ type: "real", default: 0 })
  netAmount!: number;

  @Column({ type: "real", default: 0 })
  netAmount2!: number;

  @Column({ default: "" })
  deductions!: string;

  @Column({ type: "real", default: 0 })
  deductionAmount!: number;

  @Column({ type: "real", default: 0 })
  totalAmount!: number;

  @Column({ type: "real", default: 0 })
  rate!: number;

  @ManyToOne(() => Worker, (worker) => worker.payrolls, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    nullable: true,
  })
  worker!: Relation<Worker>;
}
