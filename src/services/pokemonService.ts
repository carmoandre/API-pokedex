import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";
import UserPokemons from "../entities/UserPokemons";

interface UserPokemonsIds {
    [key: number]: boolean;
}

interface PokemonWithNewAttribute {
    id: number;
    name: string;
    number: number;
    image: string;
    weight: number;
    height: number;
    baseExp: number;
    description: string;
    isMyPokemons: boolean;
}

export async function getPokemons(userId: number) {
    const userRepository = getRepository(User);
    const pokemonsRepository = getRepository(Pokemon);

    const user = await userRepository.find({
        where: { id: userId },
        relations: ["userPokemons"],
    });

    const pokemonsObj: UserPokemonsIds = {};
    user[0].userPokemons.forEach((pokemon) => {
        pokemonsObj[pokemon.pokemonId] = true;
    });

    const pokemons = await pokemonsRepository.find();

    const pokemonsWithNewAttribute: Array<PokemonWithNewAttribute> =
        pokemons.map((pokemon) => {
            return {
                ...pokemon,
                isMyPokemons: pokemonsObj[pokemon.id] ? true : false,
            };
        });

    return pokemonsWithNewAttribute;
}

export async function alterCatchedPokemonStatus(
    userId: number,
    pokemonId: number,
    addOrRemove: string
) {
    const repository = getRepository(UserPokemons);

    if (addOrRemove === "add") {
        await repository.insert({ userId, pokemonId });
    } else {
        await repository.delete({ userId, pokemonId });
    }
}
