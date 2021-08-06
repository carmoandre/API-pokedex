import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {
    const userId = res.locals["user"];
    const pokemons = await pokemonService.getPokemons(userId);
    return res.send(pokemons);
}
