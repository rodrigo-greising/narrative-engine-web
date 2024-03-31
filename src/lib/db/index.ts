import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const sql = postgres(process.env.DATABASE_URL, { max: 1 })
export const db = drizzle(sql);


migrate(db, { migrationsFolder: "drizzle" });

sql.end();