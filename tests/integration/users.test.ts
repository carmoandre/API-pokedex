import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { userBody, createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await getConnection().close();
});

describe("POST /sign-up", () => {
    it("should answer with status 201 for valid params", async () => {
        const params = userBody();
        const body = { ...params, confirmPassword: params.password };

        const response = await supertest(app).post("/sign-up").send(body);
        expect(response.status).toBe(201);
    });

    it("should answer with status 409 for email conflict", async () => {
        const params = userBody();
        const body = { ...params, confirmPassword: params.password };
        await createUser(params);

        const response = await supertest(app).post("/sign-up").send(body);
        expect(response.status).toBe(409);
    });

    it("should answer with status 400 for difference between params password and confirmPassword", async () => {
        const params = userBody();
        const body = { ...params, confirmPassword: "whatever" };

        const response = await supertest(app).post("/sign-up").send(body);
        expect(response.status).toBe(400);
    });

    it("should answer with status 400 for wrong format of email param", async () => {
        const params = userBody();
        const body = { ...params, email: "whatever" };

        const response = await supertest(app).post("/sign-up").send(body);
        expect(response.status).toBe(400);
    });
});

describe("POST /sign-in", () => {
    it("should answer with status 200 for valid params", async () => {
        const body = userBody();
        await createUser(body);

        const response = await supertest(app).post("/sign-in").send(body);
        expect(response.status).toBe(200);
    });

    it("should answer with status 400 for wrong format of email param", async () => {
        const body = userBody();
        body.email = "whatever";

        const response = await supertest(app).post("/sign-in").send(body);
        expect(response.status).toBe(400);
    });

    it("should answer with status 401 for wrong email param", async () => {
        const body = userBody();
        await createUser(body);
        body.email = "whatever@whatever.com";

        const response = await supertest(app).post("/sign-in").send(body);
        expect(response.status).toBe(401);
    });

    it("should answer with status 401 for wrong password param", async () => {
        const body = userBody();
        const result = await createUser(body);
        body.password = "whatever";

        const response = await supertest(app).post("/sign-in").send(body);
        expect(response.status).toBe(401);
    });
});
