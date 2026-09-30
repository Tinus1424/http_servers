import { db } from "../index.js";
import { users } from "../schema.js";

export async function resetDb() {
    const [result] = await db
        .delete(users);
}