import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { cartItemId, quantity } = await req.json();

    if (!cartItemId || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json(updatedItem);
  } catch (err) {
    console.error("UPDATE CART ERROR:", err);
    return NextResponse.json(
      { error: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
