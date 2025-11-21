import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();

export async function POST(req) {
    const data = await req.json();

    console.log('Received order data:', data);

    if (!data.packageId || !data.location || !data.phone) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await Prisma.order.create({
        data: {
        packageId: data.packageId,
        location: data.location,
        phone: data.phone,
        notes: data.notes,
        },
    });

    return NextResponse.json(data);
    
}