import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import Payroll from "./Payroll";
import WorkerRate from "./WorkerRate";

@Entity()
export default class PayrollData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column()
  grossAmount!: number;

  @Column()
  sharingPercentage!: number;

  // @Column()
  // payrollId!: number;

  @ManyToOne(() => Payroll, (payroll) => payroll.payrollData, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  payroll!: Relation<Payroll>;

  @ManyToOne(() => WorkerRate, (workerRate) => workerRate.payrollDatas, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  workerRate!: Relation<WorkerRate>;
}
