import { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const header = req.header(`Authorization`);
    const token = header.split(`Bearer `)[1];
    const user = await authService.authenticate(token);
    if (!user) return res.sendStatus(401);

    res.locals.user = user.id;
    next();
}
