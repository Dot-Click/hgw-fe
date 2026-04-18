import { prisma } from "@/lib/prisma";

export class UserService {
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        accounts: {
          select: {
            providerId: true,
            createdAt: true,
          },
        },
      },
    });
  }

  static async updateProfile(id: string, data: { name?: string; image?: string }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
