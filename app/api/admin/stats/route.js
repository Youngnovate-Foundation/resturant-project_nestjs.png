import prisma from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const totalOrders = await prisma.order.count();
  const completedOrders = await prisma.order.count({
    where: { isCompleted: true },
  });
  const foodCount = await prisma.food.count();

  return NextResponse.json({ totalOrders, completedOrders, foodCount });
}
