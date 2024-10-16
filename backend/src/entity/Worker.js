const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Worker', // Name of the entity
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    idNumber: {
      type: 'varchar'
    },
    department: {
      type: 'varchar'
    }
  },
  relations: {
    payrolls: {
      type: 'one-to-many',
      target: 'Payroll',    // Refers to the 'Payroll' entity
      inverseSide: 'worker' // Inverse relation from Payroll
    }
  }
});
