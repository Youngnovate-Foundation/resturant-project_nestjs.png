// /app/api/product/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [foods, drinks, others] = await Promise.all([
      prisma.food.findMany(),
      prisma.drink.findMany(),
      prisma.others.findMany(),
    ]);

    const products = [
      ...foods.map((f) => ({ ...f, type: "food" })),
      ...drinks.map((d) => ({ ...d, type: "drink" })),
      ...others.map((o) => ({ ...o, type: "other" })),
    ];

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
