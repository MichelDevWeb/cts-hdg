import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Check if we're in build phase (Vercel sets NEXT_PHASE during build)
const isBuildTime = 
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NEXT_PHASE === "phase-development-build";

const connectionString = process.env.DATABASE_URL;

// Only skip connection during build time, not at runtime
// At runtime in Vercel, we should connect if DATABASE_URL exists
let client: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (!isBuildTime && connectionString) {
  try {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    // Note: postgres-js creates connection pool lazily, so this won't connect immediately
    client = postgres(connectionString, { 
      prepare: false,
      // Add connection options to handle errors gracefully
      onnotice: () => {}, // Suppress notices
      connection: {
        // Timeout settings
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

// Create a no-op db instance for build time or when connection fails
// Errors will be caught by try-catch blocks in pages/API routes
const createNoOpDb = () => {
  return new Proxy({} as ReturnType<typeof drizzle>, {
    get(_target, prop) {
      // Provide a more helpful error message
      const errorMsg = isBuildTime 
        ? "Database connection not available during build"
        : connectionString 
          ? "Database connection failed - check DATABASE_URL configuration"
          : "DATABASE_URL environment variable not set";
      throw new Error(errorMsg);
    },
  });
};

export const db = dbInstance || createNoOpDb();

export type DB = typeof db;

