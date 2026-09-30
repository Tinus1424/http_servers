import type { Request, Response } from "express";
import { config } from "../config.js";
import { resetDb } from "../db/queries/reset.js";
import { respondWithError } from "./json.js";

export async function handlerReset(_: Request, res: Response) {
    config.api.fileserverHits = 0;
    if (config.api.platform != "dev") {
        respondWithError(res, 403, "Forbidden")
    };
    resetDb();
    res.write("Hits reset to 0");
    res.end();
}