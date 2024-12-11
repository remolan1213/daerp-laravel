import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import CashAdvance from "./CashAdvance";
import Payroll from "./Payroll";

@Entity()
class Worker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idNumber!: string;

  @Column()
  bankAccount!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  middleName!: string;

  @Column()
  department!: string;

  @OneToMany(() => CashAdvance, (cashAdvance) => cashAdvance.worker)
  cashAdvances!: CashAdvance[];

  @OneToMany(() => Payroll, (payroll) => payroll.worker)
  payrolls!: Payroll[];
}

export default Worker;
