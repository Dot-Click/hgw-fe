import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminApi } from "@/lib/services/auth-service";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { authorized, response } = await verifyAdminApi();
        if (!authorized) return response;

        const { id } = await params;
        const data = await req.json();
        
        const { title, description, authorName, readTime, featured, imageUrl, categoryId, status } = data;

        // Handle featured logic: Only one article can be featured at a time
        if (featured) {
            await prisma.article.updateMany({
                where: { 
                    featured: true,
                    id: { not: id }
                },
                data: { featured: false }
            });
        }

        const article = await prisma.article.update({
            where: { id },
            data: {
                title,
                description,
                authorName,
                readTime: readTime ? parseInt(readTime) : undefined,
                featured: !!featured,
                imageUrl,
                categoryId,
                status
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
        console.error("Error updating article:", error);
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { authorized, response } = await verifyAdminApi();
        if (!authorized) return response;

        const { id } = await params;

        await prisma.article.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting article:", error);
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}
