import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();



type APIConfig = {
    fileserverHits: number;
    port: number;
    platform: string;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

type Config = {
    api: APIConfig;
    db: DBConfig;
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
};


export const config: Config = {
    api:  {
        fileserverHits: 0,
        port: Number(envOrThrow("PORT")),
        platform: envOrThrow("PLATFORM"),
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: migrationConfig,
    }
}; 

export function envOrThrow(key: string): string {
    const keyVar = process.env[key]
    if (keyVar === undefined) {
        throw new Error(`${key} is missing!`)
    }
    return keyVar;
};