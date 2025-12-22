import { NextResponse } from "next/server";
const prisma = require("@/lib/prisma");  // ← fixed import

export async function POST(req) {
  try {
    const { userId, foodId, drinkId, othersId, quantity } = await req.json();

    let price = 0;

    // FOOD
    if (foodId) {
      const food = await prisma.food.findUnique({
        where: { id: foodId },
        include: { packages: true },
      });

      if (!food) {
        return NextResponse.json({ error: "Food not found" }, { status: 404 });
      }

      // take smallest package price
      price = food.packages?.length
        ? Math.min(...food.packages.map(p => p.price))
        : food.price;
    }

    // DRINK
    if (drinkId) {
      const drink = await prisma.drink.findUnique({
        where: { id: drinkId },
      });
      if (!drink) return NextResponse.json({ error: "Drink not found" }, { status: 404 });
      price = drink.price;
    }

    // OTHERS
    if (othersId) {
      const others = await prisma.others.findUnique({
        where: { id: othersId },
      });
      if (!others) return NextResponse.json({ error: "Item not found" }, { status: 404 });
      price = others.price;
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        foodId: foodId || null,
        drinkId: drinkId || null,
        othersId: othersId || null,
        quantity,
      },
    });

    return NextResponse.json(cartItem);
  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
