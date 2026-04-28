import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminApi } from "@/lib/services/auth-service";

/**
 * GET /api/dashboard/stats
 * 
 * Returns all dashboard analytics data:
 * - Stats cards (total players, published, articles, subscribers)
 * - Recent players (last 4 added)
 * - Articles published per day (last 7 days)
 * - Growth analytics (players & subscribers per day, last 7 days)
 */
export async function GET(req: Request) {
    try {
        const { authorized, response } = await verifyAdminApi();
        if (!authorized) return response;

        const { searchParams } = new URL(req.url);
        const daysParam = searchParams.get("days");
        const days = daysParam ? parseInt(daysParam) : 7;

        const now = new Date();
        const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // ─── Stats Cards ───────────────────────────────────────────
        const [
            totalPlayers,
            publishedPlayers,
            totalArticles,
            totalSubscribers,
            playersLastMonth,
            publishedLastMonth,
            articlesLastMonth,
            subscribersLastMonth,
        ] = await Promise.all([
            prisma.player.count(),
            prisma.player.count({ where: { status: "PUBLISHED" } }),
            prisma.article.count(),
            prisma.subscriber.count(),
            prisma.player.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
            prisma.player.count({ where: { status: "PUBLISHED", createdAt: { gte: thirtyDaysAgo } } }),
            prisma.article.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
            prisma.subscriber.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        ]);

        // Calculate percentage changes (avoid division by zero)
        const calcChange = (total: number, recent: number) => {
            const previous = total - recent;
            if (previous <= 0) return recent > 0 ? "+100%" : "0%";
            const pct = Math.round((recent / previous) * 100);
            return pct >= 0 ? `+${pct}%` : `${pct}%`;
        };

        const stats = {
            totalPlayers,
            publishedPlayers,
            totalArticles,
            totalSubscribers,
            playersChange: `${calcChange(totalPlayers, playersLastMonth)} this month`,
            publishedChange: `${calcChange(publishedPlayers, publishedLastMonth)} this month`,
            articlesChange: `${calcChange(totalArticles, articlesLastMonth)} this month`,
            subscribersChange: `${calcChange(totalSubscribers, subscribersLastMonth)} this month`,
        };

        // ─── Recent Players (last 4) ──────────────────────────────
        const recentPlayers = await prisma.player.findMany({
            take: 4,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                image: true,
                status: true,
                finalScore: true,
                category: { select: { name: true } },
            },
        });

        // ─── Articles Published Per Day (dynamic days) ─────────────
        const articlesRaw = await prisma.article.findMany({
            where: { createdAt: { gte: startDate } },
            select: { createdAt: true },
            orderBy: { createdAt: "asc" },
        });

        // Group articles by day
        const articlesByDay: Record<string, number> = {};
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const key = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            articlesByDay[key] = 0;
        }
        articlesRaw.forEach((a) => {
            const key = a.createdAt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            if (key in articlesByDay) articlesByDay[key]++;
        });

        const articlesChart = Object.entries(articlesByDay).map(([name, count]) => ({ name, count }));

        // ─── Growth Analytics (players & subscribers per day, dynamic days) ─
        const [playersGrowthRaw, subscribersGrowthRaw] = await Promise.all([
            prisma.player.findMany({
                where: { createdAt: { gte: startDate } },
                select: { createdAt: true },
                orderBy: { createdAt: "asc" },
            }),
            prisma.subscriber.findMany({
                where: { createdAt: { gte: startDate } },
                select: { createdAt: true },
                orderBy: { createdAt: "asc" },
            }),
        ]);

        const growthByDay: Record<string, { players: number; subscribers: number }> = {};
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const key = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            growthByDay[key] = { players: 0, subscribers: 0 };
        }
        playersGrowthRaw.forEach((p) => {
            const key = p.createdAt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            if (key in growthByDay) growthByDay[key].players++;
        });
        subscribersGrowthRaw.forEach((s) => {
            const key = s.createdAt.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
            if (key in growthByDay) growthByDay[key].subscribers++;
        });

        const growthChart = Object.entries(growthByDay).map(([name, data]) => ({
            name,
            players: data.players,
            subscribers: data.subscribers,
        }));

        return NextResponse.json({
            stats,
            recentPlayers,
            articlesChart,
            growthChart,
        });
    } catch (error: any) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard stats" },
            { status: 500 }
        );
    }
}
