import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { categorySchema } from "@/lib/schemas";
import { z } from "zod";

/**
 * GET /api/categories
 * Fetches all categories. Restricted to Admin only.
 */
export async function GET() {
  const session = await getServerSession();

  // AUTHENTICATION & RBAC CHECK
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Admin access only" }, 
      { status: 403 }
    );
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" }, 
      { status: 500 }
    );
  }
}

/**
 * POST /api/categories
 * Creates a new category. Restricted to Admin only.
 */
export async function POST(req: Request) {
  const session = await getServerSession();

  // AUTHENTICATION & RBAC CHECK
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Admin access only" }, 
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const validatedData = categorySchema.parse(body);

    // PREVENT DUPLICATES
    const existingCategory = await prisma.category.findUnique({
      where: { name: validatedData.name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category name already exists" }, 
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: validatedData,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message }, 
        { status: 400 }
      );
    }
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
