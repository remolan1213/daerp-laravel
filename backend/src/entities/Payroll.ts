import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import PayrollData from './PayrollData';

@Entity()
export default class Payroll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  payrollPeriod!: string;

  @Column({ unique: true })
  payrollDate!: Date;  

  @OneToMany(() => PayrollData, payrollData => payrollData.payroll)
  payrollData!: PayrollData[];
}
