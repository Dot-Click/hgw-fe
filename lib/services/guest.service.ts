import { prisma } from "../prisma";

export class GuestService {
    static async getAllGuests() {
        return await prisma.guest.findMany({
            orderBy: { name: "asc" }
        });
    }

    static async createGuest(data: { name: string; avatar?: string; bio?: string }) {
        return await prisma.guest.create({
            data
        });
    }
}
