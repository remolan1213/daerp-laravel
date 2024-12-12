import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Payroll from './Payroll';

@Entity()
export default class PayrollData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  grossmount!: number;

  @Column()
  workerpercentage!: number;

  @Column()
  sharingpercentage!: number;

  @ManyToOne(() => Payroll, payroll => payroll.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payroll!: Payroll;
}


