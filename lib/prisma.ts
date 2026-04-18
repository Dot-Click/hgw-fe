import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/config/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  const url = env.DATABASE_URL;
  
  // Detection logic for Prisma Accelerate or other proxy protocols
  const isAccelerate = url.startsWith("prisma://") || url.startsWith("prisma+postgres://");

  if (isAccelerate) {
    // For Prisma Accelerate, initialize directly without the 'pg' adapter
    return new PrismaClient({
      datasources: {
        db: {
          url: url,
        },
      },
      log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }

  // For standard PostgreSQL, use the @prisma/adapter-pg with a connection pool
  const pool = new Pool({
    connectionString: url,
  });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
