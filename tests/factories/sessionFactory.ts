import { getRepository } from "typeorm";

import Session from "../../src/entities/Session";

export async function createSession(userId: number, token: string) {
    const sessionRepository = getRepository(Session);
    await sessionRepository.insert({ userId, token });
}
