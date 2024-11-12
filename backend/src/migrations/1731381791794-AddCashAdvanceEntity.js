const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateCashAdvance1678370101271 {
  async up(queryRunner) {
    // Create 'cash_advance' table
    await queryRunner.query(`
      CREATE TABLE "cash_advance" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "amount" DECIMAL NOT NULL,
        "dateRequested" DATE NOT NULL,
        "dateGiven" DATE,
        "remainAmount" DECIMAL NOT NULL,
        "status" VARCHAR DEFAULT 'pending',
        "workerId" INTEGER,
        FOREIGN KEY ("workerId") REFERENCES "worker"("id") ON DELETE CASCADE
      )
    `);
  }

  async down(queryRunner) {
    // Drop 'cash_advance' table in case of rollback
    await queryRunner.query('DROP TABLE "cash_advance"');
  }
};
