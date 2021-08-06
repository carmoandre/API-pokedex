import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";

import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);

app.get("/pokemons", authMiddleware, pokemonController.getPokemons);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.sendStatus(500);
});

export async function init() {
    await connectDatabase();
}

export default app;
