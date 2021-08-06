import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntitiesTables1628209452187 implements MigrationInterface {
    name = 'CreateEntitiesTables1628209452187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userPokemons" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_e3dfc348f178e7a8c17b68734bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, "inMyPokemons" boolean NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_adba93fee6560e93ff084514b89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userPokemons" ADD CONSTRAINT "FK_7df3d612d515a0c8dd416337493" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_7df3d612d515a0c8dd416337493"`);
        await queryRunner.query(`ALTER TABLE "userPokemons" DROP CONSTRAINT "FK_adba93fee6560e93ff084514b89"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "userPokemons"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
