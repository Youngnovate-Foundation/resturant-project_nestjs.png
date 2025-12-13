import { NextResponse } from "next/server";
import prisma from "@prisma/client";  // your prisma instance

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { cartItemId } = body;

    if (!cartItemId) {
      return NextResponse.json({ error: "cartItemId is required" }, { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId }
    });

    return NextResponse.json({ message: "Item removed" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
