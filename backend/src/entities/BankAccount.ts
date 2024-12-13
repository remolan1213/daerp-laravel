import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  Relation,
} from "typeorm";
import Worker from "./Worker"; // Import Worker

@Entity()
@Unique("unique_account_number", ["accountNumber"])
export default class BankAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accountNumber!: string;

  @Column()
  bankName!: string;

  @Column()
  accountStatus!: string;

  @ManyToOne(() => Worker, (worker) => worker.bankAccounts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    nullable: false,
  })
  worker!: Relation<Worker>;
}
