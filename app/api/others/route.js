import { NextResponse } from "next/server";
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET() {
    try {
  const others = await prisma.others.findMany();
  return  NextResponse.json(others);
    } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch others" }, { status: 500 });
  }
  
}
