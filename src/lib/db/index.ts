import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// Try to connect if DATABASE_URL is available (even during build)
// Vercel provides DATABASE_URL during build if configured in environment variables
// If connection fails, we'll use the no-op db that returns empty results
let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (connectionString) {
  try {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    // Note: postgres-js creates connection pool lazily, so this won't connect immediately
    client = postgres(connectionString, { 
      prepare: false,
      // Add connection options to handle errors gracefully
      onnotice: () => {}, // Suppress notices
      connection: {
        // Timeout settings - shorter timeout during build
        connect_timeout: 10,
      },
    });
    dbInstance = drizzle(client, { schema });
  } catch (error) {
    // Log error but don't throw - let try-catch blocks in pages handle it
    console.error("Failed to initialize database connection:", error);
    // Don't set dbInstance, so we'll use the no-op below
  }
}

// Create a no-op db instance when connection fails or DATABASE_URL is not set
// Returns chainable query builders that resolve to empty results
// This allows pages to handle the error gracefully and fall back to mock data
const createNoOpDb = () => {
  // Create a chainable query builder that returns empty results when awaited
  const createEmptyQueryBuilder = (): any => {
    const emptyPromise = Promise.resolve([]);
    const builder = {
      select: () => builder,
      from: () => builder,
      where: () => builder,
      orderBy: () => builder,
      limit: () => builder,
      returning: () => builder,
      set: () => builder,
      values: () => builder,
      then: emptyPromise.then.bind(emptyPromise),
      catch: emptyPromise.catch.bind(emptyPromise),
      finally: emptyPromise.finally.bind(emptyPromise),
      [Symbol.toStringTag]: "Promise",
    };
    return builder;
  };

  return new Proxy({} as ReturnType<typeof drizzle>, {
    get(_target, prop) {
      // For query methods, return chainable builders that resolve to empty results
      if (prop === "select" || prop === "query" || prop === "insert" || prop === "update" || prop === "delete") {
        return createEmptyQueryBuilder;
      }
      
      // For other properties, return a no-op function or empty value
      if (typeof prop === "string" && prop.startsWith("_")) {
        return undefined;
      }
      
      // Return a no-op function for other methods
      return () => Promise.resolve([]);
    },
  });
};

export const db = dbInstance || createNoOpDb();

export type DB = typeof db;

