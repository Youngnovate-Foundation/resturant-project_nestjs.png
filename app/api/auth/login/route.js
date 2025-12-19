const bcrypt = require("bcryptjs");
const prisma = require("@/lib/prisma");

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
}
