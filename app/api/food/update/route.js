import prisma from "@prisma/client";

export async function PUT(req) {
  const { id, name, imageUrl } = await req.json();

  const updated = await prisma.food.update({
    where: { id: Number(id) },
    data: {
      name,
      imageUrl: imageUrl || null,
    },
  });

  return Response.json(updated);
}
