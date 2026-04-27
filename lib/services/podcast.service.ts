import { prisma } from "../prisma";

export interface PodcastCreateData {
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    createdById: string;
    playerIds: string[]; // At least one required
    guestIds?: string[];
    platforms: any[]; // JSON array
    status?: string;
    featured?: boolean;
    isPick?: boolean;
    duration?: number;
}

export class PodcastService {
    static async getAllPodcasts(filters?: any) {
        return await prisma.podcast.findMany({
            where: filters,
            include: {
                category: true,
                players: true,
                guests: true,
                createdBy: {
                    select: { name: true, image: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
    }

    static async getPodcastById(id: string) {
        return await prisma.podcast.findUnique({
            where: { id },
            include: {
                category: true,
                players: true,
                guests: true,
                createdBy: {
                    select: { name: true, image: true }
                }
            }
        });
    }

    /**
     * GET FEATURED PODCAST
     */
    static async getFeaturedPodcast() {
        return await prisma.podcast.findFirst({
            where: { featured: true, status: "published" },
            include: {
                category: true,
                players: true,
                guests: true,
                createdBy: {
                    select: { name: true, image: true }
                }
            }
        });
    }

    static async createPodcast(data: PodcastCreateData) {
        if (!data.playerIds || data.playerIds.length === 0) {
            throw new Error("At least one player must be selected");
        }

        return await prisma.$transaction(async (tx) => {
            // 1. Handle Featured Logic: If this one is featured, un-feature all others
            if (data.featured) {
                await tx.podcast.updateMany({
                    where: { featured: true },
                    data: { featured: false }
                });
            }

            // 2. AUTO-CALCULATE EPISODE NUMBER
            const lastPodcast = await tx.podcast.findFirst({
                orderBy: { episodeNumber: 'desc' },
                select: { episodeNumber: true }
            });
            const nextEpisodeNumber = (lastPodcast?.episodeNumber || 0) + 1;

            // 3. Create the podcast
            return await tx.podcast.create({
                data: {
                    title: data.title,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    status: data.status || "draft",
                    featured: data.featured || false,
                    isPick: data.isPick || false,
                    episodeNumber: nextEpisodeNumber, // Auto-incremented
                    duration: data.duration,
                    platforms: data.platforms || [],
                    category: { connect: { id: data.categoryId } },
                    createdBy: { connect: { id: data.createdById } },
                    players: {
                        connect: data.playerIds.map(id => ({ id }))
                    },
                    guests: data.guestIds ? {
                        connect: data.guestIds.map(id => ({ id }))
                    } : undefined
                }
            });
        });
    }

    static async updatePodcast(id: string, data: Partial<PodcastCreateData>) {
        if (data.playerIds && data.playerIds.length === 0) {
            throw new Error("At least one player must be selected");
        }

        return await prisma.$transaction(async (tx) => {
            // If this one is being featured, un-feature all others
            if (data.featured) {
                await tx.podcast.updateMany({
                    where: { featured: true, id: { not: id } },
                    data: { featured: false }
                });
            }

            const { playerIds, guestIds, categoryId, createdById, ...rest } = data;

            return await tx.podcast.update({
                where: { id },
                data: {
                    ...rest,
                    players: playerIds ? {
                        set: playerIds.map(id => ({ id }))
                    } : undefined,
                    guests: guestIds ? {
                        set: guestIds.map(id => ({ id }))
                    } : undefined,
                    category: categoryId ? {
                        connect: { id: categoryId }
                    } : undefined,
                }
            });
        });
    }

    static async incrementListens(id: string) {
        return await prisma.podcast.update({
            where: { id },
            data: {
                listens: {
                    increment: 1
                }
            }
        });
    }

    static async deletePodcast(id: string) {
        return await prisma.podcast.delete({
            where: { id }
        });
    }

    static async getPodcastStats() {
        const [totalEpisodes, totalListensResult, avgRatingResult, weeklyReleases] = await Promise.all([
            // 1. Total Episodes
            prisma.podcast.count({ where: { status: "published" } }),
            
            // 2. Total Listens
            prisma.podcast.aggregate({
                _sum: { listens: true },
                where: { status: "published" }
            }),

            // 3. Average Rating
            prisma.podcast.aggregate({
                _avg: { rating: true },
                where: { status: "published" }
            }),

            // 4. Weekly Releases (last 7 days)
            prisma.podcast.count({
                where: {
                    status: "published",
                    releaseDate: {
                        gte: new Date(new Date().setDate(new Date().getDate() - 7))
                    }
                }
            })
        ]);

        return {
            totalEpisodes,
            totalListens: totalListensResult._sum.listens || 0,
            averageRating: avgRatingResult._avg.rating || 0,
            weeklyReleases
        };
    }
}
