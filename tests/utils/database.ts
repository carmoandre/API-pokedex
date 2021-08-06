import { getRepository } from "typeorm";

import Session from "../../src/entities/Session";
import UserPokemons from "../../src/entities/UserPokemons";
import Pokemon from "../../src/entities/Pokemon";
import User from "../../src/entities/User";

export async function clearDatabase() {
    await getRepository(Session).delete({});
    await getRepository(UserPokemons).delete({});
    await getRepository(Pokemon).delete({});
    await getRepository(User).delete({});
}
