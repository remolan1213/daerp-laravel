// PayrollData.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "PayrollData",
  tableName: "payrolldata",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    description: {
      type: "text",
      length: 255,
      nullable: false,
    },
    grossAmount: {
      type: "real",
      nullable: false,
    },
    workerPercentage: {
      type: "real",
      nullable: false,
    },
    sharingPercentage: {
      type: "real",
      nullable: false,
    },
  },
  relations: {
    payroll: {
      target: "Payroll",
      type: "many-to-one",
      joinColumn: {
        name: "idPayroll",
      },
      nullable: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});
