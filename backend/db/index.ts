import { config } from "dotenv";
import { resolve } from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";

config({ path: resolve(__dirname, "../../.env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required");

const db = drizzle({ connection: { connectionString } });

export { db };