import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminApi } from "@/lib/services/auth-service";

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            include: {
                category: true,
                createdBy: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { authorized, session, response } = await verifyAdminApi();
        if (!authorized) return response;

        const data = await req.json();
        const { title, description, authorName, readTime, featured, imageUrl, categoryId, status } = data;

        if (!title || !description || !authorName || !imageUrl || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Handle featured logic: Only one article can be featured at a time
        if (featured) {
            await prisma.article.updateMany({
                where: { featured: true },
                data: { featured: false }
            });
        }

        const article = await prisma.article.create({
            data: {
                title,
                description,
                authorName,
                readTime: readTime ? parseInt(readTime) : undefined,
                featured: !!featured,
                imageUrl,
                categoryId,
                status: status || 'DRAFT',
                createdById: session!.user.id
            },
            include: {
                category: true,
                createdBy: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
    }
}
