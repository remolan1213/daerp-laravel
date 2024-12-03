import { EntitySchema } from 'typeorm';
import Worker from './Worker.js';

export default new EntitySchema({
  name: 'CashAdvance',
  tableName: 'cash_advance',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    amount: {
      type: 'decimal'
    },
    remainAmount: {
      type: 'decimal'
    },
    status: {
      type: 'varchar',
      default: 'pending'
    }
  },
  relations: {
    worker: {
      target: () => Worker,
      type: 'many-to-one',
      joinColumn: {
        name: 'workerId'
      },
      onDelete: 'CASCADE'
    }
  }
});
