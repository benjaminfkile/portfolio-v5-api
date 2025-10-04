import knex, { Knex } from "knex";
import { IAPISecrets } from "../interfaces";
import { TNodeEnviromnent } from "../types";

let db: Knex | null = null;

export async function initDb(
  secrets: IAPISecrets,
  environmnet: TNodeEnviromnent
): Promise<Knex> {
  if (db) return db;

  const { db_host, db_proxy_url, db_username, db_password, db_name, db_port } =
    secrets;

  const dbUrl = environmnet === "production" ? db_proxy_url : db_host;

  db = knex({
    client: "pg",
    connection: {
      host: dbUrl,
      user: db_username,
      password: db_password,
      database: db_name,
      port: db_port,
      ssl: { rejectUnauthorized: false },
    },
  });

  return db;
}

export function getDb(): Knex {
  if (!db) {
    throw new Error("Database has not been initialized. Call initDb() first.");
  }
  return db;
}
