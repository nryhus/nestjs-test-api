import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1777020471033 implements MigrationInterface {
    name = 'Migration1777020471033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "class" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "class"`);
    }

}
