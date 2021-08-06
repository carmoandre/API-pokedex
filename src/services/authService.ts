import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import Session from "../entities/Session";

export async function authenticate(token: string) {
    const sessionRepository = getRepository(Session);
    const secretKey = process.env.JWT_SCRET;
    const data = jwt.verify(token, secretKey) as { user: number };

    const session = await sessionRepository.findOne({
        where: {
            userId: data.user,
            token,
        },
        relations: ["user"],
    });
    if (!session) return null;

    return session.user;
}
