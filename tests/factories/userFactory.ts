import { getRepository } from "typeorm";
import faker from "faker";
import bcrypt from "bcrypt";

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
    const repository = getRepository(User);

    const encrypted = bcrypt.hashSync(body.password, 12);

    const user = await repository.create({ ...body, password: encrypted });

    const result = await repository.save(user);

    return result;
}
