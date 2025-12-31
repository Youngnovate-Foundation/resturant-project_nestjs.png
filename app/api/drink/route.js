import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* =========================
   GET: All drinks
   ========================= */
export async function GET() {
  try {
    const drinks = await prisma.drink.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(drinks);
  } catch (error) {
    console.error("GET /api/drink error:", error);
    return NextResponse.json(
      { error: "Failed to fetch drinks" },
      { status: 500 }
    );
  }
}

/* =========================
   POST: Create drink
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

    const drink = await prisma.drink.create({
      data: {
        name,
        imageUrl,
        price: Number(price),
      },
    });

    return NextResponse.json(drink);
  } catch (error) {
    console.error("POST /api/drink error:", error);
    return NextResponse.json(
      { error: "Failed to create drink" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT: Update drink
   ========================= */
export async function PUT(req) {
  try {
    const { id, name, imageUrl, price } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Drink id is required" },
        { status: 400 }
      );
    }

    const drink = await prisma.drink.update({
      where: { id },
      data: {
        name,
        imageUrl,
        price: price !== undefined ? Number(price) : undefined,
      },
    });

    return NextResponse.json(drink);
  } catch (error) {
    console.error("PUT /api/drink error:", error);
    return NextResponse.json(
      { error: "Failed to update drink" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE: Delete drink
   ========================= */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Drink id is required" },
        { status: 400 }
      );
    }

    await prisma.drink.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/drink error:", error);
    return NextResponse.json(
      { error: "Failed to delete drink" },
      { status: 500 }
    );
  }
}
