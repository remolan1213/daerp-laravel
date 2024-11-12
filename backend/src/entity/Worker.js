const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Worker", // Name of the entity
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    middlename: {
      type: "varchar",
      nullable: true, // Allow nulls if middlename isn't always present
    },
    lastname: {
      type: "varchar",
    },

    idNumber: {
      type: "varchar",
      unique: true,
    },
    department: {
      type: "varchar",
    },
    bankAccount: {
      type: "varchar",
    },
  },
  relations: {
    payrolls: {
      type: "one-to-many",
      target: "Payroll", // Refers to the 'Payroll' entity
      inverseSide: "worker", // Inverse relation from Payroll
    },
  },
  // Define a virtual property for `fullName`
  // Calculated from `firstname`, `middlename`, and `lastname`
  getters: {
    fullName() {
      return `${this.firstname} ${
        this.middlename ? this.middlename + " " : ""
      }${this.lastname}`;
    },
  },
});
