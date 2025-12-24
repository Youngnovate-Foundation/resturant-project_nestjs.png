import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        food: true,
        drink: true,
        others: true,
      },
    });

    if (!cartItems.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // 2️⃣ Ensure every cart item has a price
    const cartItemsWithPrice = await Promise.all(
      cartItems.map(async (item) => {
        let price = item.price;

        if (price == null) {
          // fallback logic if price missing
          if (item.food) {
            price = item.food.packages?.length
              ? Math.min(...item.food.packages.map((p) => p.price))
              : item.food.price || 0;
          } else if (item.drink) {
            price = item.drink.price || 0;
          } else if (item.others) {
            price = item.others.price || 0;
          }

          // update the cartItem with the price in DB
          await prisma.cartItem.update({
            where: { id: item.id },
            data: { price },
          });
        }

        return { ...item, price };
      })
    );

    // 3️⃣ Calculate total
    const total = cartItemsWithPrice.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 4️⃣ Create order
    const order = await prisma.order.create({
      data: {
        total,
        status: "pending",
        user: {
          connect: { id: userId },
        },
        items: {
          create: cartItemsWithPrice.map((item) => ({
            foodId: item.foodId || null,
            drinkId: item.drinkId || null,
            othersId: item.othersId || null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // 5️⃣ Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    return NextResponse.json(order);
  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
