import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    port: number;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

type Config = {
    api: APIConfig;
    db: DBConfig;
}

export const config: Config {
    api: {
        fileserverHits = 0,
        port = envOrThrow("PORT"),
    },
    db: {
        url = envOrThrow("DB_URL") // RIGHT NOW I'M HERE THINKING OF HOW TO LOAD THE MIGRATION SETTINGS, SEE BOOTS CHAT
    }
}; 

export function envOrThrow(key: string): string {
    const keyVar = process.env[key]
    if (keyVar === undefined) {
        throw new Error(`${key} is missing!`)
    }
    return keyVar;
};