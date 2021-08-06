import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

interface BodyParams {
    email: string;
    password: string;
}

export function userBody() {
    const body = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    return body;
}

export async function createUser(body: BodyParams) {
    const user = await getRepository(User).create(body);

    const result = await getRepository(User).save(user);

    return result;
}
