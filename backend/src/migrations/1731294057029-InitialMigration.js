const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class InitialMigration1731294057029 {
    name = 'InitialMigration1731294057029'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "worker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "idNumber" varchar NOT NULL, "department" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" varchar NOT NULL, "grossAmount" decimal NOT NULL, "netAmount" decimal NOT NULL, "deductions" varchar NOT NULL, "deductionAmount" decimal NOT NULL, "totalAmount" decimal NOT NULL, "workerId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" varchar NOT NULL, "grossAmount" decimal NOT NULL, "netAmount" decimal NOT NULL, "deductions" varchar NOT NULL, "deductionAmount" decimal NOT NULL, "totalAmount" decimal NOT NULL, "workerId" integer, CONSTRAINT "FK_bfd18d0d76a2bffa92b36449e1b" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payroll"("id", "payrollPeriod", "payrollDate", "grossAmount", "netAmount", "deductions", "deductionAmount", "totalAmount", "workerId") SELECT "id", "payrollPeriod", "payrollDate", "grossAmount", "netAmount", "deductions", "deductionAmount", "totalAmount", "workerId" FROM "payroll"`);
        await queryRunner.query(`DROP TABLE "payroll"`);
        await queryRunner.query(`ALTER TABLE "temporary_payroll" RENAME TO "payroll"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payroll" RENAME TO "temporary_payroll"`);
        await queryRunner.query(`CREATE TABLE "payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" varchar NOT NULL, "grossAmount" decimal NOT NULL, "netAmount" decimal NOT NULL, "deductions" varchar NOT NULL, "deductionAmount" decimal NOT NULL, "totalAmount" decimal NOT NULL, "workerId" integer)`);
        await queryRunner.query(`INSERT INTO "payroll"("id", "payrollPeriod", "payrollDate", "grossAmount", "netAmount", "deductions", "deductionAmount", "totalAmount", "workerId") SELECT "id", "payrollPeriod", "payrollDate", "grossAmount", "netAmount", "deductions", "deductionAmount", "totalAmount", "workerId" FROM "temporary_payroll"`);
        await queryRunner.query(`DROP TABLE "temporary_payroll"`);
        await queryRunner.query(`DROP TABLE "payroll"`);
        await queryRunner.query(`DROP TABLE "worker"`);
    }
}
