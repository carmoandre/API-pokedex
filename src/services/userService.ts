import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import User from "../entities/User";
import Session from "../entities/Session";

export async function signUp(email: string, password: string) {
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });
    if (user) return false;

    const encrypted = bcrypt.hashSync(password, 12);
    await repository.insert({ email, password: encrypted });
    return true;
}

export async function signIn(email: string, password: string): Promise<string> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    //console.log(user, !user);
    if (!user) return null;
    console.log(password);
    console.log(user.password);
    console.log(bcrypt.compareSync(password, user.password));
    if (bcrypt.compareSync(password, user.password)) {
        const data = { user: user.id };
        const secretKey = process.env.JWT_SCRET;
        const configs = { expiresIn: 60 * 60 * 24 * 30 };
        const token = jwt.sign(data, secretKey, configs);
        console.log(token);

        const sessionRepository = getRepository(Session);
        await sessionRepository.insert({ userId: user.id, token });

        return token;
    } else {
        return null;
    }
}
