import { EntitySchema } from 'typeorm';
import Payroll from './Payroll.js';

export default new EntitySchema({
  name: 'PayrollData',
  tableName: 'payrolldata',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    description: {
      type: 'text'
    },
    grossmount: {
      type: 'real'
    },
    workerpercentage: {
      type: 'real'
    },
    sharingpercentage: {
      type: 'real'
    }
  },
  relations: {
    payroll: {
      target: Payroll,
      type: 'many-to-one',
      joinColumn: {
        name: 'idPayroll'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }
});
