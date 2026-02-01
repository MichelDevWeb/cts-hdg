import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// For use in Edge functions and server components
const connectionString = process.env.DATABASE_URL;

// Skip connection if DATABASE_URL is missing or points to localhost (common during build)
const shouldSkipConnection = 
  !connectionString || 
  connectionString.includes("localhost") || 
  connectionString.includes("127.0.0.1");

// Only create connection if we have a valid remote database URL
let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (!shouldSkipConnection) {
  try {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    client = postgres(connectionString, { prepare: false });
    dbInstance = drizzle(client, { schema });
  } catch (error) {
    // Silently fail if connection can't be established (e.g., during build)
    // Pages have try-catch blocks to handle this gracefully
    if (process.env.NODE_ENV === "development") {
      console.warn("Database connection not available:", error);
    }
  }
}

// Create a no-op db instance that throws when accessed
// Errors will be caught by try-catch blocks in pages, which will fall back to mock data
const createNoOpDb = () => {
  return new Proxy({} as ReturnType<typeof drizzle>, {
    get() {
      throw new Error("Database connection not available");
    },
  });
};

export const db = dbInstance || createNoOpDb();

export type DB = typeof db;

