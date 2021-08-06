import { getRepository } from "typeorm";
import faker from "faker";

import Pokemon from "../../src/entities/Pokemon";

interface PokemonParams {
    name: string;
    number: number;
    image: string;
    weight: number;
    height: number;
    baseExp: number;
    description: string;
}

export function pokemonBody() {
    const body = {
        name: faker.name.findName(),
        number: faker.datatype.number(),
        image: faker.internet.url(),
        weight: faker.datatype.number(),
        height: faker.datatype.number(),
        baseExp: faker.datatype.number(),
        description: faker.lorem.paragraph(),
    };
    return body;
}

export async function createPokemon(body: PokemonParams) {
    const repository = getRepository(Pokemon);

    const pokemon = await repository.create({ ...body });

    const result = await repository.save(pokemon);

    return result;
}

export async function createManyPokemons(qtd: number) {
    const createdPokemons = [];
    for (let i = 0; i < qtd; i++) {
        createdPokemons.push((await createPokemon(pokemonBody())).id);
    }
    return createdPokemons;
}
