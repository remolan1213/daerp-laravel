import { EntitySchema } from 'typeorm';
import CashAdvance from './CashAdvance.js';

export default new EntitySchema({
  name: 'CashAdvanceDates',
  tableName: 'cash_advance_dates',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    dateRequested: {
      type: 'date'
    },
    dateGiven: {
      type: 'date',
      nullable: true
    }
  },
  relations: {
    cashAdvance: {
      target: CashAdvance,
      type: 'many-to-one',
      joinColumn: {
        name: 'cashAdvanceId'
      },
      onDelete: 'CASCADE'
    }
  }
});
