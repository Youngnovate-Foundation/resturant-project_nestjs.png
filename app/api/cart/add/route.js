import { NextResponse } from "next/server";
const prisma = require("@/lib/prisma");

export async function POST(req) {
  try {
    const { userId, foodId, drinkId, othersId, quantity } = await req.json();

    let price = 0;

    // ✅ FOOD (has packages)
    if (foodId) {
      const food = await prisma.food.findUnique({
        where: { id: foodId },
        include: { packages: true },
      });

      if (!food) {
        return NextResponse.json(
          { error: "Food not found" },
          { status: 404 }
        );
      }

      // ✅ take smallest package price
      if (food.packages?.length) {
        price = Math.min(...food.packages.map(p => p.price));
      } else {
        price = food.price;
      }
    }

    // ✅ DRINK (no packages)
    if (drinkId) {
      const drink = await prisma.drink.findUnique({
        where: { id: drinkId },
      });
      price = drink.price;
    }

    // ✅ OTHERS (no packages)
    if (othersId) {
      const others = await prisma.others.findUnique({
        where: { id: othersId },
      });
      price = others.price;
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        foodId,
        drinkId,
        othersId,
        quantity,
        price,
      },
    });

    return NextResponse.json(cartItem);

  } catch (err) {
    console.error("ADD TO CART ERROR:", err);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
