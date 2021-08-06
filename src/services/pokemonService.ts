import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import User from "../entities/User";

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
