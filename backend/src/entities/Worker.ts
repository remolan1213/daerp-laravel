import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from "typeorm";
import  BankAccount  from "./BankAccount";
import CashAdvance from "./CashAdvance";
import PayrollData from "./PayrollData";
import WorkerRate from "./WorkerRate";

@Entity()
@Unique("unique_id_number", ["idNumber"])
export default class Worker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  idNumber!: string;

  @Column()
  department!: string;

  @Column({ length: 25 })
  firstName!: string;

  @Column({ length: 25 })
  lastName!: string;

  @Column({ length: 25 })
  middleName!: string;

  @OneToMany(() => CashAdvance, (cashAdvance) => cashAdvance.worker)
  cashAdvances!: CashAdvance[];

  @OneToMany(() => WorkerRate, (workerRate) => workerRate.worker)
  workerRates!: WorkerRate[];

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.worker)
  bankAccounts!: BankAccount[];
}
