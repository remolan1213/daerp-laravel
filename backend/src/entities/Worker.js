import { EntitySchema } from "typeorm";
import CashAdvance from "./CashAdvance.js";
import Payroll from "./Payroll.js";
import WorkerNames from "./WorkerNames.js";

export default new EntitySchema({
  name: "Worker",
  tableName: "worker",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    idNumber: {
      type: "varchar",
    },
    department: {
      type: "varchar",
    },
  },
  relations: {
    cashAdvances: {
      target: () => CashAdvance,
      type: "one-to-many",
      inverseSide: "worker",
    },
    payrolls: {
      target: () => Payroll,
      type: "one-to-many",
      inverseSide: "worker",
    },
    names: {
      target: () => WorkerNames,
      type: "one-to-many",
      inverseSide: "worker",
    },
  },
});
