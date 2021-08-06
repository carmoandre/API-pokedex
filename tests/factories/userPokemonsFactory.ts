import { getRepository } from "typeorm";

import UserPokemons from "../../src/entities/UserPokemons";

export async function catchPokemon(userId: number, pokemonId: number) {
    const repository = getRepository(UserPokemons);

    const userPokemons = await repository.create({ userId, pokemonId });

    const result = await repository.save(userPokemons);

    return result;
}

export async function catchManyPokemon(userId: number, pokemonsIds: number[]) {
    pokemonsIds.forEach(async (pokemon) => {
        await catchPokemon(userId, pokemon);
    });
}
