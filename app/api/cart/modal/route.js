import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, foodId, packageId, location, notes, quantity = 1 } =
      await req.json();

    if (!userId || !foodId || !packageId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const food = await prisma.food.findUnique({ where: { id: foodId }, include: { packages: true } });
    const selectedPackage = food?.packages.find((pkg) => pkg.id === packageId);
    if (!selectedPackage) return NextResponse.json({ error: "Invalid package" }, { status: 400 });

    // Check existing cart item
    const existingItem = await prisma.cartItem.findFirst({ where: { userId, foodId } });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          price: selectedPackage.price,
          packageId,
          location,
          notes,
        },
      });
      return NextResponse.json(updated);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        foodId,
        packageId,
        quantity,
        price: selectedPackage.price,
        location,
        notes,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}
