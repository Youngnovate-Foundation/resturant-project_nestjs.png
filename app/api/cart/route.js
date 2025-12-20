import { NextResponse } from "next/server";
const prisma = require("@/lib/prisma");

export async function GET(req) {
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const cart = await prisma.cartItem.findMany({
      where: { userId: Number(userId) },
      include: {
        food: true,
        drink: true,
        others: true, // include others items
      },
      orderBy: { addedAt: "desc" },
    });

    // Calculate totals
    const items = cart.map((item) => {
      const price = item.food?.price || item.drink?.price || item.others?.price || 0;
      const total = price * item.quantity;

      return {
        ...item,
        price,
        total,
      };
    });

    const cartTotal = items.reduce((sum, i) => sum + i.total, 0);

    return NextResponse.json({ items, cartTotal });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
