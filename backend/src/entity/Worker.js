const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Worker', // Name of the entity
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    firstname: {
      type: 'varchar'
    },
    lastname: {
      type: 'varchar'
    },
    middlename: {
      type: 'varchar'
    },
    idNumber: {
      type: 'varchar',
      unique: true
    },
    department: {
      type: 'varchar'
    },
    // The fullName column is a virtual one, calculated from firstname, middlename, and lastname
    fullName: {
      type: 'varchar',
      generated: 'always',
      asExpression: "(firstname || ' ' || middlename || '. ' || lastname)"
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
