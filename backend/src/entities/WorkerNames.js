import { EntitySchema } from 'typeorm';
import Worker from './Worker.js';

export default new EntitySchema({
  name: "WorkerNames",
  tableName: "worker_names",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
      default: "",
    },
    lastname: {
      type: "varchar",
      default: "",
    },
    middlename: {
      type: "varchar",
      default: "",
    },
  },
  relations: {
    worker: {
      target: () => Worker,
      type: "many-to-one",
      joinColumn: {
        name: "workerId",
      },
      onDelete: "CASCADE",
    },
  },
});
