import { prisma } from "@/lib/prisma";

export class PodcastService {
  static async getAll() {
    return prisma.podcast.findMany({
      include: {
        _count: {
          select: { episodes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.podcast.findUnique({
      where: { id },
      include: {
        episodes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  static async create(data: { title: string; description?: string; imageUrl?: string }) {
    return prisma.podcast.create({
      data,
    });
  }

  static async update(id: string, data: { title?: string; description?: string; imageUrl?: string }) {
    return prisma.podcast.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.podcast.delete({
      where: { id },
    });
  }
}
