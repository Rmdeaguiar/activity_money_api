import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1706646955353 implements MigrationInterface {
    name = 'Default1706646955353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "title"`);
    }

}
