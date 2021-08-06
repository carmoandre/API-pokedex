import bcrypt from "bcrypt";
import { getRepository } from "typeorm";

import User from "../entities/User";

export async function signUp(email: string, password: string) {
    const repository = getRepository(User);

    const user = await repository.find({ where: { email } });
    if (user.length) return false;

    const encrypted = bcrypt.hashSync(password, 12);
    await repository.insert({ email, password: encrypted });
    return true;
}
