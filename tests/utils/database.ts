import { getRepository } from "typeorm";

import Session from "../../src/entities/Session";
import User from "../../src/entities/User";

export async function clearDatabase() {
    await getRepository(Session).delete({});
    await getRepository(User).delete({});
}
