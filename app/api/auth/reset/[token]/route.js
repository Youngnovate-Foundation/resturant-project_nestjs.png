import { NextResponse } from "next/server";
import prisma from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req, { params }) {
  try {
    const { token } = params;
    const { password } = await req.json();

    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRecord)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });

    if (resetRecord.expiresAt < new Date())
      return NextResponse.json({ error: "Token expired" }, { status: 400 });

    // Update password
    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: resetRecord.email },
      data: { password: hashed },
    });

    // Delete token after use
    await prisma.passwordReset.delete({ where: { token } });

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
