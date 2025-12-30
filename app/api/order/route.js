import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* =========================
   GET: Fetch all orders
   ========================= */
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        items: {
          include: {
            food: true,
            drink: true,
            others: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/order error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

/* =========================
   PATCH: Update order status
   ========================= */
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Order id and status are required" },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("PATCH /api/order error:", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}

/* =========================
   POST: Create new order
   ========================= */
export async function POST(req) {
  try {
    const data = await req.json();

    /*
      Expected data format:
      {
        phone?: string,
        email?: string,
        location: string,
        notes?: string,
        items: [
          {
            foodId?: number,
            drinkId?: number,
            othersId?: number,
            quantity: number,
            price: number
          }
        ]
      }
    */

    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        phone: data.phone,
        email: data.email,
        location: data.location,
        notes: data.notes,
        status: "PENDING",
        items: {
          create: data.items,
        },
      },
      include: {
        items: {
          include: {
            food: true,
            drink: true,
            others: true,
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("POST /api/order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
