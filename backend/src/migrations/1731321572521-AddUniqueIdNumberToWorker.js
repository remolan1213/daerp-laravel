const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUniqueIdNumberToWorker1731321572521 {
    name = 'AddUniqueIdNumberToWorker1731321572521'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_worker" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "idNumber" varchar NOT NULL,
                "department" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_worker"("id", "name", "idNumber", "department")
            SELECT "id",
                "name",
                "idNumber",
                "department"
            FROM "worker"
        `);
        await queryRunner.query(`
            DROP TABLE "worker"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_worker"
                RENAME TO "worker"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_worker" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "idNumber" varchar NOT NULL,
                "department" varchar NOT NULL,
                CONSTRAINT "UQ_531af5cc8a07e955f1fd5b8b9af" UNIQUE ("idNumber")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_worker"("id", "name", "idNumber", "department")
            SELECT "id",
                "name",
                "idNumber",
                "department"
            FROM "worker"
        `);
        await queryRunner.query(`
            DROP TABLE "worker"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_worker"
                RENAME TO "worker"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "worker"
                RENAME TO "temporary_worker"
        `);
        await queryRunner.query(`
            CREATE TABLE "worker" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "idNumber" varchar NOT NULL,
                "department" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "worker"("id", "name", "idNumber", "department")
            SELECT "id",
                "name",
                "idNumber",
                "department"
            FROM "temporary_worker"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_worker"
        `);
        await queryRunner.query(`
            ALTER TABLE "worker"
                RENAME TO "temporary_worker"
        `);
        await queryRunner.query(`
            CREATE TABLE "worker" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "idNumber" varchar NOT NULL,
                "department" varchar NOT NULL
            )
        `);
        await queryRunner.query(`
            INSERT INTO "worker"("id", "name", "idNumber", "department")
            SELECT "id",
                "name",
                "idNumber",
                "department"
            FROM "temporary_worker"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_worker"
        `);
    }
}
