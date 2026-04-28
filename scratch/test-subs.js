const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
    const count = await p.subscriber.count();
    console.log('Subscriber count:', count);
    
    const subs = await p.subscriber.findMany({ take: 3 });
    console.log('Sample subscribers:', JSON.stringify(subs, null, 2));
    
    await p.$disconnect();
}

main().catch(e => { console.error(e); p.$disconnect(); });
