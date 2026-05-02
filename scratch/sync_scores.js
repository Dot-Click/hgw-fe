const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const players = await prisma.player.findMany();
  console.log(`Found ${players.length} players. Updating scores to 0-100 scale...`);

  for (const player of players) {
    // Recalculate based on pillars
    const rawTotal = 
      player.dominance + 
      player.longevity + 
      player.peakPerformance + 
      player.championships + 
      player.records + 
      player.culturalImpact + 
      player.clutchFactor + 
      player.versatility + 
      player.rivalry + 
      player.legacy;
    
    // Scale 0-100 is just the raw total
    const finalScore = rawTotal;

    await prisma.player.update({
      where: { id: player.id },
      data: { 
        finalScore: finalScore,
        averageHGWScore: finalScore // Also update this for consistency
      }
    });
    console.log(`Updated ${player.name}: ${finalScore}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
