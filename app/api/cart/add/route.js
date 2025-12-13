import { NextResponse } from "next/server";
import prisma from "@prisma/client";  // your prisma instance

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, foodId, drinkId, quantity } = body;

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    if (!foodId && !drinkId) {
      return NextResponse.json({ error: "foodId or drinkId is required" }, { status: 400 });
    }

    // Check if cart item already exists
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        foodId: foodId || undefined,
        drinkId: drinkId || undefined
      }
    });

    if (existingItem) {
      // Update quantity
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });

      return NextResponse.json(updated);
    }

    // Create new cart item
    const newItem = await prisma.cartItem.create({
      data: {
        userId,
        foodId,
        drinkId,
        quantity
      }
    });

    return NextResponse.json(newItem);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
