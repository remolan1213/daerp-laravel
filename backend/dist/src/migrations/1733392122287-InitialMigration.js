export class InitialMigration1733392122287 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE worker (
                id SERIAL PRIMARY KEY,
                idNumber VARCHAR(255) NOT NULL,
                bankAccount VARCHAR(255) NOT NULL,
                department VARCHAR(255) NOT NULL
            );
        `);
        await queryRunner.query(`
            CREATE TABLE cash_advance (
                id SERIAL PRIMARY KEY,
                amount DECIMAL(10, 2) NOT NULL,
                remainAmount DECIMAL(10, 2) NOT NULL,
                status VARCHAR(255) NOT NULL,
                workerId INT,
                CONSTRAINT fk_worker FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE
            );
        `);
        await queryRunner.query(`
            CREATE TABLE cash_advance_dates (
                id SERIAL PRIMARY KEY,
                dateRequested TIMESTAMP NOT NULL,
                dateGiven TIMESTAMP,
                cashAdvanceId INT,
                CONSTRAINT fk_cash_advance FOREIGN KEY (cashAdvanceId) REFERENCES cash_advance(id) ON DELETE CASCADE
            );
        `);
        await queryRunner.query(`
            CREATE TABLE payroll (
                id SERIAL PRIMARY KEY,
                payrollPeriod VARCHAR(255) NOT NULL,
                payrollDate TIMESTAMP NOT NULL,
                workerId INT,
                CONSTRAINT fk_worker FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE
            );
        `);
        await queryRunner.query(`
            CREATE TABLE payroll_data (
                id SERIAL PRIMARY KEY,
                description VARCHAR(255) NOT NULL,
                grossmount DECIMAL(10, 2) NOT NULL,
                workerpercentage DECIMAL(5, 2) NOT NULL,
                sharingpercentage DECIMAL(5, 2) NOT NULL,
                payrollId INT,
                CONSTRAINT fk_payroll FOREIGN KEY (payrollId) REFERENCES payroll(id) ON DELETE CASCADE
            );
        `);
        await queryRunner.query(`
            CREATE TABLE worker_names (
                id SERIAL PRIMARY KEY,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                middlename VARCHAR(255) NOT NULL,
                workerId INT,
                CONSTRAINT fk_worker FOREIGN KEY (workerId) REFERENCES worker(id) ON DELETE CASCADE
            );
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE worker_names;`);
        await queryRunner.query(`DROP TABLE payroll_data;`);
        await queryRunner.query(`DROP TABLE payroll;`);
        await queryRunner.query(`DROP TABLE cash_advance_dates;`);
        await queryRunner.query(`DROP TABLE cash_advance;`);
        await queryRunner.query(`DROP TABLE worker;`);
    }
}
