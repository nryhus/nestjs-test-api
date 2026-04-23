import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1776946613636 implements MigrationInterface {
  name = 'Migration1776946613636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "animal" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "class" character varying NOT NULL, "type" boolean NOT NULL DEFAULT true, "age" integer, "userId" integer, CONSTRAINT "REL_305006f0101340847e1da2edb6" UNIQUE ("userId"), CONSTRAINT "PK_af42b1374c042fb3fa2251f9f42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "age" integer, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal" ADD CONSTRAINT "FK_305006f0101340847e1da2edb61" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animal" DROP CONSTRAINT "FK_305006f0101340847e1da2edb61"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "animal"`);
  }
}
