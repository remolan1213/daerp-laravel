import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Worker from './Worker.js';

@Entity('payroll')
class Payroll {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  payrollPeriod!: string;

  @Column()
  payrollDate!: Date;  

  @ManyToOne(() => Worker, worker => worker.payrolls, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  worker!: Worker[];
}

export default Payroll;
