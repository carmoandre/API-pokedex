import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {
    const userId = res.locals["user"];
    const pokemons = await pokemonService.getPokemons(userId);
    return res.send(pokemons);
}

export async function alterCatchedPokemonStatus(req: Request, res: Response) {
    const userId = res.locals["user"];
    const { id } = req.params;
    const addOrRemove = req.path.replace(`/recommendations/${id}/`, "");
    await pokemonService.alterCatchedPokemonStatus(
        userId,
        parseInt(id),
        addOrRemove
    );

    return res.sendStatus(200);
}
