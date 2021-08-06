import { Request, Response } from "express";
import { signUpSchema, signInSchema } from "../joiSchemas/schemas";

import * as userService from "../services/userService";

export async function signUp(req: Request, res: Response) {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    const { email, password } = req.body as { email: string; password: string };
    const result = await userService.signUp(email, password);
    const status = result ? 201 : 409;
    res.sendStatus(status);
}

export async function signIn(req: Request, res: Response) {
    const validation = signInSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    const { email, password } = req.body as { email: string; password: string };
    const token = await userService.signIn(email, password);
    if (token) {
        res.send(token);
    } else {
        res.sendStatus(401);
    }
}
