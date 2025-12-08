import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();

export async function GET() {
    const orders = await Prisma.order.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            food: true,
            package: true,
        },
    });
    return NextResponse.json(orders);
}

export async function PATCH(req) {
    const { id, isCompleted } = await req.json(); // ✅

    const updatedOrder = await Prisma.order.update({
        where: { id },
        data: { isCompleted }
    });

    return NextResponse.json(updatedOrder);
}


export async function POST(req) {
    const data = await req.json();

    console.log('Received order data:', data);

    if (!data.foodId ||!data.packageId || !data.location ) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await Prisma.order.create({
        data: {
        foodId: data.foodId,
        packageId: data.packageId,
        location: data.location,
        // phone: data.phone,
        notes: data.notes,
        },
    });

    return NextResponse.json(data);
    
}