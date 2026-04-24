import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1777019949943 implements MigrationInterface {
    name = 'Migration1777019949943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."car_model_enum" AS ENUM('economy', 'sport', 'luxury', 'crossover')`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "producer" character varying NOT NULL, "year" integer NOT NULL, "model" "public"."car_model_enum" NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`);
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "REL_305006f0101340847e1da2edb6"`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "REL_305006f0101340847e1da2edb6" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TYPE "public"."car_model_enum"`);
    }

}
