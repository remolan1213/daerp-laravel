import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import CashAdvance from './CashAdvance';
import Payroll from './Payroll';
import WorkerNames from './WorkerNames';

@Entity()
class Worker {
  @PrimaryGeneratedColumn()
  id!:number;

  @Column()
  idNumber!:string;

  @Column()
  bankAccount!:string;

  @Column()
  department!:string;

  @OneToMany(() => CashAdvance, cashAdvance => cashAdvance.worker)
  cashAdvances!:CashAdvance[];

  @OneToMany(() => Payroll, payroll => payroll.worker)
  payrolls!:Payroll[]; 

  @OneToMany(() => WorkerNames, workerName => workerName.worker)
  names!:WorkerNames[];
}

export default Worker


