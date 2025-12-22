import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { cartItemId } = await req.json();

    if (!cartItemId) {
      return NextResponse.json(
        { error: "cartItemId is required" },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REMOVE CART ERROR:", err);
    return NextResponse.json(
      { error: "Failed to remove item" },
      { status: 500 }
    );
  }
}
