const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class MigrateNameToNewColumns1731376504833 {
    name = 'MigrateNameToNewColumns1731376504833';

    async up(queryRunner) {
        // Step 1: Add new columns (firstname, lastname, middlename) to the Worker table
        await queryRunner.query(`
            ALTER TABLE "worker"
            ADD COLUMN "firstname" VARCHAR NOT NULL DEFAULT '';
        `);
        await queryRunner.query(`
            ALTER TABLE "worker"
            ADD COLUMN "lastname" VARCHAR NOT NULL DEFAULT '';
        `);
        await queryRunner.query(`
            ALTER TABLE "worker"
            ADD COLUMN "middlename" VARCHAR NOT NULL DEFAULT '';
        `);

        // Step 2: Populate the new columns based on the 'name' column
        const workers = await queryRunner.query('SELECT id, name FROM "worker"');

        for (const worker of workers) {
            const nameParts = worker.name.split(" ");

            // Assuming the first part is the first name, the last part is the last name,
            // and the middle part(s) is the middle name.
            const firstname = nameParts[0];
            const lastname = nameParts[nameParts.length - 1];
            const middlename = nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : '';

            // Step 3: Update the worker record with split name data
            await queryRunner.query(`
                UPDATE "worker"
                SET 
                    "firstname" = $1,
                    "lastname" = $2,
                    "middlename" = $3
                WHERE "id" = $4
            `, [firstname, lastname, middlename, worker.id]);
        }

        // Step 4: The 'fullName' column will now be calculated by TypeORM automatically, no need to update it manually
    }

    async down(queryRunner) {
        // Step 1: Rollback changes (remove new columns)
        await queryRunner.query(`
            ALTER TABLE "worker"
            DROP COLUMN "firstname";
        `);
        await queryRunner.query(`
            ALTER TABLE "worker"
            DROP COLUMN "lastname";
        `);
        await queryRunner.query(`
            ALTER TABLE "worker"
            DROP COLUMN "middlename";
        `);
    }
};
