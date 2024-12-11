export class InitialMigration1733415452546 {
    name = 'InitialMigration1733415452546';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "cash_advance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer NOT NULL, "remainAmount" integer NOT NULL, "status" varchar NOT NULL, "workerId" integer)`);
        await queryRunner.query(`CREATE TABLE "payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" datetime NOT NULL, "workerId" integer)`);
        await queryRunner.query(`CREATE TABLE "worker_names" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "middlename" varchar NOT NULL, "workerId" integer)`);
        await queryRunner.query(`CREATE TABLE "worker" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "idNumber" varchar NOT NULL, "bankAccount" varchar NOT NULL, "department" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "cash_advance_dates" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateRequested" datetime NOT NULL, "dateGiven" datetime, "cashAdvanceId" integer)`);
        await queryRunner.query(`CREATE TABLE "payroll_data" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "grossmount" integer NOT NULL, "workerpercentage" integer NOT NULL, "sharingpercentage" integer NOT NULL, "payrollId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_cash_advance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer NOT NULL, "remainAmount" integer NOT NULL, "status" varchar NOT NULL, "workerId" integer, CONSTRAINT "FK_f04a658b59355dfcd312e459ad6" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_cash_advance"("id", "amount", "remainAmount", "status", "workerId") SELECT "id", "amount", "remainAmount", "status", "workerId" FROM "cash_advance"`);
        await queryRunner.query(`DROP TABLE "cash_advance"`);
        await queryRunner.query(`ALTER TABLE "temporary_cash_advance" RENAME TO "cash_advance"`);
        await queryRunner.query(`CREATE TABLE "temporary_payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" datetime NOT NULL, "workerId" integer, CONSTRAINT "FK_bfd18d0d76a2bffa92b36449e1b" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_payroll"("id", "payrollPeriod", "payrollDate", "workerId") SELECT "id", "payrollPeriod", "payrollDate", "workerId" FROM "payroll"`);
        await queryRunner.query(`DROP TABLE "payroll"`);
        await queryRunner.query(`ALTER TABLE "temporary_payroll" RENAME TO "payroll"`);
        await queryRunner.query(`CREATE TABLE "temporary_worker_names" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "middlename" varchar NOT NULL, "workerId" integer, CONSTRAINT "FK_95d595b895f4e41b2318c34a992" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_worker_names"("id", "firstname", "lastname", "middlename", "workerId") SELECT "id", "firstname", "lastname", "middlename", "workerId" FROM "worker_names"`);
        await queryRunner.query(`DROP TABLE "worker_names"`);
        await queryRunner.query(`ALTER TABLE "temporary_worker_names" RENAME TO "worker_names"`);
        await queryRunner.query(`CREATE TABLE "temporary_cash_advance_dates" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateRequested" datetime NOT NULL, "dateGiven" datetime, "cashAdvanceId" integer, CONSTRAINT "FK_f82ead22be91c46295ee2619f75" FOREIGN KEY ("cashAdvanceId") REFERENCES "cash_advance" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_cash_advance_dates"("id", "dateRequested", "dateGiven", "cashAdvanceId") SELECT "id", "dateRequested", "dateGiven", "cashAdvanceId" FROM "cash_advance_dates"`);
        await queryRunner.query(`DROP TABLE "cash_advance_dates"`);
        await queryRunner.query(`ALTER TABLE "temporary_cash_advance_dates" RENAME TO "cash_advance_dates"`);
        await queryRunner.query(`CREATE TABLE "temporary_payroll_data" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "grossmount" integer NOT NULL, "workerpercentage" integer NOT NULL, "sharingpercentage" integer NOT NULL, "payrollId" integer, CONSTRAINT "FK_996458b4d1a2a765bd06be83198" FOREIGN KEY ("payrollId") REFERENCES "payroll" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_payroll_data"("id", "description", "grossmount", "workerpercentage", "sharingpercentage", "payrollId") SELECT "id", "description", "grossmount", "workerpercentage", "sharingpercentage", "payrollId" FROM "payroll_data"`);
        await queryRunner.query(`DROP TABLE "payroll_data"`);
        await queryRunner.query(`ALTER TABLE "temporary_payroll_data" RENAME TO "payroll_data"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payroll_data" RENAME TO "temporary_payroll_data"`);
        await queryRunner.query(`CREATE TABLE "payroll_data" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL, "grossmount" integer NOT NULL, "workerpercentage" integer NOT NULL, "sharingpercentage" integer NOT NULL, "payrollId" integer)`);
        await queryRunner.query(`INSERT INTO "payroll_data"("id", "description", "grossmount", "workerpercentage", "sharingpercentage", "payrollId") SELECT "id", "description", "grossmount", "workerpercentage", "sharingpercentage", "payrollId" FROM "temporary_payroll_data"`);
        await queryRunner.query(`DROP TABLE "temporary_payroll_data"`);
        await queryRunner.query(`ALTER TABLE "cash_advance_dates" RENAME TO "temporary_cash_advance_dates"`);
        await queryRunner.query(`CREATE TABLE "cash_advance_dates" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dateRequested" datetime NOT NULL, "dateGiven" datetime, "cashAdvanceId" integer)`);
        await queryRunner.query(`INSERT INTO "cash_advance_dates"("id", "dateRequested", "dateGiven", "cashAdvanceId") SELECT "id", "dateRequested", "dateGiven", "cashAdvanceId" FROM "temporary_cash_advance_dates"`);
        await queryRunner.query(`DROP TABLE "temporary_cash_advance_dates"`);
        await queryRunner.query(`ALTER TABLE "worker_names" RENAME TO "temporary_worker_names"`);
        await queryRunner.query(`CREATE TABLE "worker_names" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL, "middlename" varchar NOT NULL, "workerId" integer)`);
        await queryRunner.query(`INSERT INTO "worker_names"("id", "firstname", "lastname", "middlename", "workerId") SELECT "id", "firstname", "lastname", "middlename", "workerId" FROM "temporary_worker_names"`);
        await queryRunner.query(`DROP TABLE "temporary_worker_names"`);
        await queryRunner.query(`ALTER TABLE "payroll" RENAME TO "temporary_payroll"`);
        await queryRunner.query(`CREATE TABLE "payroll" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "payrollPeriod" varchar NOT NULL, "payrollDate" datetime NOT NULL, "workerId" integer)`);
        await queryRunner.query(`INSERT INTO "payroll"("id", "payrollPeriod", "payrollDate", "workerId") SELECT "id", "payrollPeriod", "payrollDate", "workerId" FROM "temporary_payroll"`);
        await queryRunner.query(`DROP TABLE "temporary_payroll"`);
        await queryRunner.query(`ALTER TABLE "cash_advance" RENAME TO "temporary_cash_advance"`);
        await queryRunner.query(`CREATE TABLE "cash_advance" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" integer NOT NULL, "remainAmount" integer NOT NULL, "status" varchar NOT NULL, "workerId" integer)`);
        await queryRunner.query(`INSERT INTO "cash_advance"("id", "amount", "remainAmount", "status", "workerId") SELECT "id", "amount", "remainAmount", "status", "workerId" FROM "temporary_cash_advance"`);
        await queryRunner.query(`DROP TABLE "temporary_cash_advance"`);
        await queryRunner.query(`DROP TABLE "payroll_data"`);
        await queryRunner.query(`DROP TABLE "cash_advance_dates"`);
        await queryRunner.query(`DROP TABLE "worker"`);
        await queryRunner.query(`DROP TABLE "worker_names"`);
        await queryRunner.query(`DROP TABLE "payroll"`);
        await queryRunner.query(`DROP TABLE "cash_advance"`);
    }
}
