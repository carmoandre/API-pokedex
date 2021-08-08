import axios from "axios";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {
    const userId = res.locals["user"];
    const pokemons = await pokemonService.getPokemons(userId);
    return res.send(pokemons);
}

export async function alterCatchedPokemonStatus(req: Request, res: Response) {
    const userId = res.locals["user"];
    const { id } = req.params;
    const addOrRemove = req.path.replace(`/my-pokemons/${id}/`, "");

    await pokemonService.alterCatchedPokemonStatus(
        userId,
        parseInt(id),
        addOrRemove
    );

    return res.sendStatus(200);
}

export async function populateDatabase(req: Request, res: Response) {
    console.log("Entrou");
    for (let i = 1; i <= 898; i++) {
        const result = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const newPokemon = {
            name: result.data.name,
            number: result.data.id,
            image: result.data.sprites.front_default,
            weight: result.data.weight,
            height: result.data.height,
            baseExp: result.data.base_experience,
            description: "",
        };
        const speciesResult = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${i}`
        );
        for (
            let j = 0;
            j < speciesResult.data.flavor_text_entries.length;
            j++
        ) {
            if (
                speciesResult.data.flavor_text_entries[j].language.name === "en"
            ) {
                newPokemon.description = speciesResult.data.flavor_text_entries[
                    j
                ].flavor_text
                    .split("\n")
                    .join(" ");
            }
        }
        await getRepository(Pokemon).insert(newPokemon);
    }
    res.send("OK");
}
