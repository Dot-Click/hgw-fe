import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: ReturnType<typeof createPrismaClient> | undefined;
}

function createPrismaClient() {
  return new PrismaClient().$extends(withAccelerate());
}

/**
 * Lazy-load Prisma instance to prevent build-time crashes.
 * Next.js evaluates modules during the build phase; by using a getter,
 * we ensure Prisma only tries to initialize when an actual request is made.
 */
export const prisma = new Proxy({} as any, {
  get: (target, prop) => {
    // Check if we already have a global instance
    if (!globalThis.prismaGlobal) {
      globalThis.prismaGlobal = createPrismaClient();
    }
    
    const instance = globalThis.prismaGlobal;
    const value = (instance as any)[prop];
    
    // Bind functions to the instance
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

export default prisma;
