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

    // 2️⃣ Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 3️⃣ Create order
    const order = await prisma.order.create({
      data: {
        total,
        status: "pending",
        user: { connect: { id: userId } }, // ✅ connect user properly
        items: {
          create: cartItems.map((item) => ({
            foodId: item.foodId || null,
            drinkId: item.drinkId || null,
            othersId: item.othersId || null,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    // 4️⃣ Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    return NextResponse.json(order);
  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
