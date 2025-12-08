import prisma from "@prisma/client";

export async function GET(req, { params }) {
  const id = Number(params.id);

  const food = await prisma.food.findUnique({
    where: { id },
    include: { packages: true },
  });

  return Response.json(food);
}
