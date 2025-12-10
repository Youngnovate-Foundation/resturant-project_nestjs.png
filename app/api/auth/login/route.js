import { NextResponse } from "next/server";
import prisma from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });

    //Cookie Setting
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60* 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
