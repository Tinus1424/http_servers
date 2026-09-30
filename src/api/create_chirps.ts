import { UUID } from "crypto";
import type { Request, Response } from "express";
import { BadRequestError } from "./error_middleware.js";
import { respondWithJSON } from "./json.js";
import { createChirp } from "../db/queries/chirps.js";

export async function handlerCreateChirps(req: Request, res: Response) {
    type parameters = {
        body: string;
        userId: UUID;
    };

    const params: parameters = req.body;

    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new BadRequestError("Chirp is too long. Max length is 140");
    }

    const stringArray = params.body.split(" ");
    const buffer: Array<string> = []
    for (const str of stringArray) {
        if (["kerfuffle", "sharbert", "fornax"].includes(str.toLowerCase()) ) {
        buffer.push("****");
        } else {
        buffer.push(str);
        }
    };

    const result = buffer.join(" ");

    const chirp = await createChirp({
        body: result,
        user_id: params.userId
    });
    console.log(chirp);
    respondWithJSON(res, 201, {
        id: chirp.id,
        createdAt: chirp.created_at,
        updatedAt: chirp.updatedAt,
        body: chirp.body,
        userId: chirp.user_id,
    });
};
