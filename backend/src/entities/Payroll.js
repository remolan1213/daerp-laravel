import { EntitySchema } from 'typeorm';
import Worker from './Worker.js';

export default new EntitySchema({
  name: 'Payroll',
  tableName: 'payroll',
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
    }
  },
  relations: {
    worker: {
      target: () => Worker,
      type: 'many-to-one',
      joinColumn: {
        name: 'workerId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      inverseSide: 'payrolls'
    }
  }
});
