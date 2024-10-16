const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Payroll', // Name of the entity
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    payrollPeriod: {
      type: 'varchar'
    },
    payrollDate: {
      type: 'varchar'
    },
    grossAmount: {
      type: 'decimal'
    },
    netAmount: {
      type: 'decimal'
    },
    deductions: {
      type: 'varchar'
    },
    deductionAmount: {
      type: 'decimal'
    },
    totalAmount: {
      type: 'decimal'
    }
  },
  relations: {
    worker: {
      type: 'many-to-one',
      target: 'Worker',     // Refers to the 'Worker' entity
      joinColumn: true      // Creates a foreign key column
    }
  }
});
