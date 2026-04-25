import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
// Using globalThis which is more robust in Next.js 15/16 with Turbopack
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Ensure the connection is handled by Prisma Client's lazy loading
// Remove manual connect to prevent overhead in Next.js dev mode

/**
 * PRODUCTION PERFORMANCE TIP:
 * When querying, always use 'select' to fetch only the fields you need.
 * Example: prisma.user.findUnique({ where: { id }, select: { name: true, image: true } })
 */

