import { NextResponse } from "next/server";
import prisma from "@prisma/client";  // your prisma instance

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { cartItemId, quantity } = body;

    if (!cartItemId || quantity < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity }
    });

    return NextResponse.json(updatedItem);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 });
  }
}
