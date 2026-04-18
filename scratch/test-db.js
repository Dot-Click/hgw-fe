require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { withAccelerate } = require('@prisma/extension-accelerate');

// Simulate the fixed logic
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
}).$extends(withAccelerate());

async function main() {
  try {
    console.log('Testing connection to Prisma Accelerate with proper config...');
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connection Successful:', result);
    const userCount = await prisma.user.count();
    console.log('✅ User count:', userCount);
  } catch (e) {
    console.error('❌ Connection Failed:');
    console.error(e);
  } finally {
    // Note: $disconnect on an extended client might behave differently
  }
}

main();
