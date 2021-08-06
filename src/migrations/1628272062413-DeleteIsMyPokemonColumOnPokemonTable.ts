import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteIsMyPokemonColumOnPokemonTable1628272062413 implements MigrationInterface {
    name = 'DeleteIsMyPokemonColumOnPokemonTable1628272062413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

}
