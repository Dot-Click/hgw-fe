import { prisma } from "../lib/prisma";

async function checkUser(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: { accounts: true }
    });
    console.log(JSON.stringify(user, null, 2));
}

const email = process.argv[2];
if (email) {
    checkUser(email);
} else {
    console.log("Please provide an email");
}
