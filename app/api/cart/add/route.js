import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, foodId, drinkId, othersId, quantity } = body;

    if (!userId) return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    if (!foodId && !drinkId && !othersId) return NextResponse.json({ error: "Item id required" }, { status: 400 });

    // Check existing
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        foodId: foodId || undefined,
        drinkId: drinkId || undefined,
        othersId: othersId || undefined
      }
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
      return NextResponse.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: { userId, foodId, drinkId, othersId, quantity }
    });

    return NextResponse.json(newItem);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
