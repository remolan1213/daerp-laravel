import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from "typeorm";
import Payroll from "./Payroll";
import Worker from "./Worker";

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

  @Column()
  payrollId!: number;

  @ManyToOne(() => Payroll, (payroll) => payroll.payrollData, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  payroll!: Relation<Payroll>;

  @ManyToOne(() => Worker, (worker) => worker.payrolls, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  worker!: Relation<Worker>;
}
