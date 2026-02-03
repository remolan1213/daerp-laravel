import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from "typeorm";
import Payroll from "./Payroll";

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

  @Column({ length: 60 })
  bankAccount!: string;

  @OneToMany(() => Payroll, (payroll) => payroll.worker)
  payrolls!: Payroll[];
}
