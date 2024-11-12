const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'CashAdvance', // Name of the entity
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    amount: {
      type: 'decimal'
    },
    dateRequested: {
      type: 'date'
    },
    dateGiven: {
      type: 'date',
      nullable: true // This can be null if the cash advance hasn't been given yet
    },
    remainAmount: {
      type: 'decimal'
    },
    status: {
      type: 'varchar',
      default: 'pending' // Default status could be 'pending', but you can customize as needed
    }
  },
  relations: {
    worker: {
      type: 'many-to-one', // Many cash advances can be linked to one worker
      target: 'Worker',    // Refers to the 'Worker' entity
      inverseSide: 'cashAdvances', // Inverse relation from Worker to CashAdvance
      onDelete: 'CASCADE', // Optionally, you can set what happens when a Worker is deleted (e.g., CASCADE)
    }
  }
});
