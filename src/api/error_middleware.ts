import { NextFunction, Request, Response } from "express";
import { respondWithJSON } from "./json.js";

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
    }
}


class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
    }
}


class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
    }
}


class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}


export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log(`${err}`);
    if (err instanceof BadRequestError) {
        res.status(400).json({ "error": `${err.message}`})
    }
};