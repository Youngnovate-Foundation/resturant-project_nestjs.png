import { NextResponse } from "next/server";
import prisma from "@prisma/client";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ message: "If email exists, reset link sent" });

    // Create reset token
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 mins
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset/${token}`;

    // In real project integrate email here (Resend, Nodemailer, etc.)
    console.log("RESET LINK (DEV):", resetUrl);

    return NextResponse.json({
      message: "Reset link sent to email (if user exists)",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
