import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return NextResponse.json(
      { error: "Email not found" },
      { status: 400 }
    );

  return NextResponse.json({
    message: "Password reset link sent (placeholder)",
    // In a real app, you'd send an email with a reset link here
    // For now, just return a placeholder link
    //TODO: Implement email sending functionality
  });
}
