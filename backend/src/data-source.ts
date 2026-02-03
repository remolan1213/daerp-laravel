// src/data-source.ts
import { DataSource } from "typeorm";
import Worker from "./entities/Worker";
import Payroll from "./entities/Payroll";

const AppDataSource = new DataSource({
  type: "sqlite",
  database:"./data/db.sqlite",
  synchronize: true, // Set to `false` in production; use migrations instead.
  logging: false,
  entities: [
    Worker,
    Payroll,
  ],
  migrations: ["./migrations/*.ts"],
});

export default AppDataSource;
