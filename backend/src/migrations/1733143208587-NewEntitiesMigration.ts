import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntitiesMigration1733143208587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE worker (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                idNumber VARCHAR(255) NOT NULL,
                department VARCHAR(255) NOT NULL,
                UNIQUE (idNumber)
            );

            CREATE TABLE worker_names (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workerId INTEGER,
                firstname VARCHAR(255) DEFAULT '',
                lastname VARCHAR(255) DEFAULT '',
                middlename VARCHAR(255) DEFAULT '',
                FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE
            );

            CREATE TABLE payroll (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                payrollPeriod VARCHAR(255) NOT NULL,
                payrollDate VARCHAR(255) NOT NULL,
                workerId INTEGER,
                FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE ON UPDATE CASCADE
            );

            CREATE TABLE cash_advance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount DECIMAL NOT NULL,
                remainAmount DECIMAL NOT NULL,
                status VARCHAR(255) DEFAULT 'pending',
                workerId INTEGER,
                FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE
            );

            CREATE TABLE cash_advance_dates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cashAdvanceId INTEGER,
                dateRequested DATE NOT NULL,
                dateGiven DATE,
                FOREIGN KEY (cashAdvanceId) REFERENCES cash_advance(id) ON DELETE CASCADE
            );

            CREATE TABLE payrolldata (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                grossmount REAL NOT NULL,
                workerpercentage REAL NOT NULL,
                sharingpercentage REAL NOT NULL,
                idPayroll INTEGER,
                FOREIGN KEY (idPayroll) REFERENCES payroll(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS payrolldata;
            DROP TABLE IF EXISTS cash_advance_dates;
            DROP TABLE IF EXISTS cash_advance;
            DROP TABLE IF EXISTS payroll;
            DROP TABLE IF EXISTS worker_names;
            DROP TABLE IF EXISTS worker;
        `);
    }
}
