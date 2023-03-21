import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677358810937 implements MigrationInterface {
    name = 'default1677358810937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "mail" character varying(70) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_2e5b50f4b7c081eceea476ad128" UNIQUE ("mail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "spents" ("id" SERIAL NOT NULL, "description" character varying(50) NOT NULL, "value" numeric(10,2) NOT NULL, "iduser" integer, CONSTRAINT "PK_fdf8432c53458c1211cd521463c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "spents" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("iduser") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spents" DROP CONSTRAINT "fk_user_id"`);
        await queryRunner.query(`DROP TABLE "spents"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
