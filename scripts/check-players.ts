import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const players = await prisma.player.findMany({
    select: { id: true, name: true }
  });
  console.log('Players in DB:', JSON.stringify(players, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
