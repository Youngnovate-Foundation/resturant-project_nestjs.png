import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* =========================
   GET: All others
   ========================= */
export async function GET() {
  try {
    const others = await prisma.others.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(others);
  } catch (error) {
    console.error("GET /api/others error:", error);
    return NextResponse.json(
      { error: "Failed to fetch others" },
      { status: 500 }
    );
  }
}

/* =========================
   POST: Create others
   ========================= */
export async function POST(req) {
  try {
    const { name, imageUrl, price } = await req.json();

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const other = await prisma.others.create({
      data: {
        name,
        imageUrl,
        price: Number(price),
      },
    });

    return NextResponse.json(other);
  } catch (error) {
    console.error("POST /api/others error:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT: Update others
   ========================= */
export async function PUT(req) {
  try {
    const { id, name, imageUrl, price } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Item id is required" },
        { status: 400 }
      );
    }

    const other = await prisma.others.update({
      where: { id },
      data: {
        name,
        imageUrl,
        price: price !== undefined ? Number(price) : undefined,
      },
    });

    return NextResponse.json(other);
  } catch (error) {
    console.error("PUT /api/others error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE: Delete others
   ========================= */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Item id is required" },
        { status: 400 }
      );
    }

    await prisma.others.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/others error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
