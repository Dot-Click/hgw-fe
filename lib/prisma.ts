import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Only log warnings and errors in production to minimize I/O overhead
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * PRODUCTION PERFORMANCE TIP:
 * When querying, always use 'select' to fetch only the fields you need.
 * Example: prisma.user.findUnique({ where: { id }, select: { name: true, image: true } })
 */

