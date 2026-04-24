import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1777020407828 implements MigrationInterface {
    name = 'Migration1777020407828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
        await queryRunner.query(`DROP TYPE "public"."car_model_enum"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "model" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
        await queryRunner.query(`CREATE TYPE "public"."car_model_enum" AS ENUM('economy', 'sport', 'luxury', 'crossover')`);
        await queryRunner.query(`ALTER TABLE "car" ADD "model" "public"."car_model_enum" NOT NULL`);
    }

}
