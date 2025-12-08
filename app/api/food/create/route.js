import prisma from "@prisma/client";

export async function POST(req) {
  const { name, imageUrl } = await req.json();

  const newFood = await prisma.food.create({
    data: {
      name,
      imageUrl: imageUrl || null,
    },
  });

  return Response.json(newFood);
}
