// src/data-source.ts
import { DataSource } from "typeorm";
import Worker from "./entities/Worker.js";
import Payroll from "./entities/Payroll.js";
import CashAdvance from "./entities/CashAdvance.js";
import CashAdvanceDates from "./entities/CashAdvanceDates.js";
import PayrollData from "./entities/PayrollData.js";
import WorkerNames from "./entities/WorkerNames.js";
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "../../data/db.sqlite",
    synchronize: true, // Set to `false` in production; use migrations instead.
    logging: true,
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
