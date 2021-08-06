import jwt from "jsonwebtoken";

import { userBody, createUser } from "../factories/userFactory";
import { createSession } from "./sessionFactory";

export async function getUnsavedToken() {
    const body = userBody();
    const user = await createUser(body);

    const data = { user: user.id };
    const secretKey = process.env.JWT_SCRET;
    const configs = { expiresIn: 60 * 60 * 24 * 30 };
    return jwt.sign(data, secretKey, configs);
}

export async function getValidToken() {
    const body = userBody();
    const user = await createUser(body);

    const data = { user: user.id };
    const secretKey = process.env.JWT_SCRET;
    const configs = { expiresIn: 60 * 60 * 24 * 30 };
    const token = jwt.sign(data, secretKey, configs);
    await createSession(data.user, token);

    return { token, userId: user.id };
}
