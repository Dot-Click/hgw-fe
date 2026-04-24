import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminApi } from "@/lib/services/auth-service";
import { categorySchema } from "@/lib/schemas";
import { z } from "zod";

/**
 * GET /api/categories/:id
 * Fetches a single category. Admin only.
 */
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * PUT /api/categories/:id
 * Updates a category. Admin only.
 */
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const body = await req.json();
    const validatedData = categorySchema.parse(body);

    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // UNIQUE NAME VALIDATION (if changing)
    if (validatedData.name !== existingCategory.name) {
      const nameCollision = await prisma.category.findUnique({
        where: { name: validatedData.name },
      });
      if (nameCollision) {
        return NextResponse.json({ error: "Category name already exists" }, { status: 400 });
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * DELETE /api/categories/:id
 * Deletes a category. Admin only.
 */
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { authorized, response } = await verifyAdminApi();
  if (!authorized) return response;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
