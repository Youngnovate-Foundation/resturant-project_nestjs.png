export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const prisma = require("@/lib/prisma");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    return NextResponse.json({ message: "Account created successfully" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}