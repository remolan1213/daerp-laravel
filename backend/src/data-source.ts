// src/data-source.ts
import { DataSource } from "typeorm";
import Worker from "./entities/Worker";
import BankAccount from "./entities/BankAccount";
import Payroll from "./entities/Payroll";
import CashAdvance from "./entities/CashAdvance";
import PayrollData from "./entities/PayrollData";

const AppDataSource = new DataSource({
  type: "sqlite",
  database:"./data/db.sqlite",
  synchronize: true, // Set to `false` in production; use migrations instead.
  logging: false,
  entities: [
    Worker,
    BankAccount,
    Payroll,
    CashAdvance,
    PayrollData,
  ],
  migrations: ["./migrations/*.ts"],
});

export default AppDataSource;

