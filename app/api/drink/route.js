import { NextResponse } from "next/server";
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
    try {
  const drinks = await prisma.drink.findMany();
  return  NextResponse.json(drinks);
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch drinks" }, { status: 500 });
  }
  
}
