import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import BankAccount from './BankAccount';
import CashAdvance from './CashAdvance';
import Payroll from './Payroll';

@Entity()
export default class Worker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idNumber!: string;

  @Column()
  department!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.worker)
  bankAccounts!: BankAccount[];

  @OneToMany(() => CashAdvance, (cashAdvance) => cashAdvance.worker)
  cashAdvances!: CashAdvance[];

  @OneToMany(() => Payroll, (payroll) => payroll.worker)
  payrolls!: Payroll[];
}