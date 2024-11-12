const { MigrationInterface, QueryRunner, Table, TableForeignKey } = require("typeorm");

module.exports = class CreateWorkerPayrollCashAdvance1651234567890 {
  async up(queryRunner) {
    // Create Worker table
    await queryRunner.createTable(
      new Table({
        name: "worker",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "firstname", type: "varchar", isNullable: false },
          { name: "lastname", type: "varchar", isNullable: false },
          { name: "middlename", type: "varchar", isNullable: true },
          { name: "idNumber", type: "varchar", isUnique: true },
          { name: "department", type: "varchar", isNullable: false },
          { name: "bankAccount", type: "varchar", isNullable: false },
        ],
      })
    );

    // Create Payroll table
    await queryRunner.createTable(
      new Table({
        name: "payroll",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "payrollPeriod", type: "varchar", isNullable: false },
          { name: "payrollDate", type: "varchar", isNullable: false },
          { name: "grossAmount", type: "decimal", isNullable: false },
          { name: "netAmount", type: "decimal", isNullable: false },
          { name: "deductions", type: "varchar", isNullable: false },
          { name: "deductionAmount", type: "decimal", isNullable: false },
          { name: "totalAmount", type: "decimal", isNullable: false },
          { name: "workerId", type: "INTEGEREGER", isNullable: false },
        ],
      })
    );

    // Create foreign key for Payroll -> Worker
    await queryRunner.createForeignKey(
      "payroll",
      new TableForeignKey({
        columnNames: ["workerId"],
        referencedTableName: "worker",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );

    // Create CashAdvance table
    await queryRunner.createTable(
      new Table({
        name: "cash_advance",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "amount", type: "decimal", isNullable: false },
          { name: "dateRequested", type: "date", isNullable: false },
          { name: "dateGiven", type: "date", isNullable: true },
          { name: "remainAmount", type: "decimal", isNullable: false },
          { name: "status", type: "varchar", default: "'pending'", isNullable: false },
          { name: "workerId", type: "INTEGER", isNullable: false },
        ],
      })
    );

    // Create foreign key for CashAdvance -> Worker
    await queryRunner.createForeignKey(
      "cash_advance",
      new TableForeignKey({
        columnNames: ["workerId"],
        referencedTableName: "worker",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  async down(queryRunner) {
    // Drop foreign keys first
    await queryRunner.dropForeignKey("payroll", "FK_payroll_worker");
    await queryRunner.dropForeignKey("cash_advance", "FK_cash_advance_worker");

    // Drop tables
    await queryRunner.dropTable("cash_advance");
    await queryRunner.dropTable("payroll");
    await queryRunner.dropTable("worker");
  }
};
