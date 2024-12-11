// src/data-source.ts
import { DataSource } from "typeorm";
import Worker from "./entities/Worker";
import Payroll from "./entities/Payroll";
import CashAdvance from "./entities/CashAdvance";
import CashAdvanceDates from "./entities/CashAdvanceDates";
import PayrollData from "./entities/PayrollData";
import WorkerNames from "./entities/WorkerNames";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "../data/db.sqlite",
  synchronize: true, // Set to `false` in production; use migrations instead.
  logging: false,
  entities: [
    Worker,
    Payroll,
    CashAdvance,
    CashAdvanceDates,
    PayrollData,
    WorkerNames,
  ],
  migrations: ["./migrations/*.ts"],
});

export default AppDataSource;