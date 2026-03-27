import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        longDescription: body.longDescription || null,
        icon: body.icon || "Zap",
        features: body.features || [],
        imageUrl: body.imageUrl || null,
        isFeatured: body.isFeatured || false,
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
