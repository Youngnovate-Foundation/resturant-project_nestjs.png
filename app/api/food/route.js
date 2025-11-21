import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const foods = await prisma.Food.findMany(
      { include: { packages: true } }
    );
    // console.log(foods);
    return NextResponse.json(foods); // ✅ ensures JSON is returned
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}
