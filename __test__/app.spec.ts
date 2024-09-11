import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { esPalindromo } from "../src/palindromo.js";
import { esPrimo } from "../src/numeros.js";

describe("Test Suite App", () => {

    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint key", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /palindromo", () => {
        expect(esPalindromo('ana')).toBe(true);
        expect(esPalindromo('Ana')).toBe(true);
        expect(esPalindromo('Hola')).toBe(false);
    });

    test("endpoint /primo", () => {
        expect(esPrimo(2)).toBe(true);
        expect(esPrimo(3)).toBe(true);
        expect(esPrimo(1)).toBe(false);
        expect(esPrimo(29)).toBe(true);
        expect(esPrimo(80)).toBe(false);
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });
    test("test de endpoint /key", async () => {
        return await request(app)
            .get("/key")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
            })
    });
    test("test de endpoint /palindromo/pop", async () => {
        return await request(app)
            .get("/palindromo/pop")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada es palindromo`);
            })
    });
    test("test de endpoint /primo/3", async () => {
        return await request(app)
            .get("/primo/3")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado es un numero primo`);
            })
    });

    test("test de endpoint /palindromo/pastel", async () => {
        return await request(app)
            .get("/palindromo/pastel")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, La frase ingresada no es palindromo`);
            })
    });
    test("test de endpoint /primo/4", async () => {
        return await request(app)
            .get("/primo/4")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, el numero ingresado no es un numero primo`);
            })
    });
});