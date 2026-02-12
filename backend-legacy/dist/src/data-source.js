// src/data-source.ts
import { DataSource } from "typeorm";
import Worker from "./entities/Worker.js";
import BankAccount from "./entities/BankAccount.js";
import Payroll from "./entities/Payroll.js";
import CashAdvance from "./entities/CashAdvance.js";
import PayrollData from "./entities/PayrollData.js";
import WorkerRate from "./entities/WorkerRate.js";
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./data/db.sqlite",
    synchronize: true, // Set to `false` in production; use migrations instead.
    logging: false,
    entities: [
        Worker,
        BankAccount,
        Payroll,
        CashAdvance,
        PayrollData,
        WorkerRate
    ],
    migrations: ["./migrations/*.ts"],
});
export default AppDataSource;
