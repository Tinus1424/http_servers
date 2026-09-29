import type { Request, Response } from "express";
import { BadRequestError } from "./error_middleware.js";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
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

  respondWithJSON(res, 200, {
    "cleanedBody": buffer.join(" "),
  });
}
