import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1687461275412 implements MigrationInterface {
    name = 'NewMigration1687461275412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL DEFAULT '', "avatar_path" character varying NOT NULL DEFAULT 'uploads/default-avatar.png', "address" text NOT NULL DEFAULT '', "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
