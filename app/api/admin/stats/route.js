const prisma = require("@/lib/prisma");
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();

    const completedOrders = await prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    });

    const foodCount = await prisma.food.count();

    return NextResponse.json({
      totalOrders,
      completedOrders,
      foodCount,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
