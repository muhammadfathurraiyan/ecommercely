import prisma from "@/lib/prisma";
import { ProductSchema } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const response = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    return Response.json(response);
  } else {
    const response = await prisma.product.findMany({
      orderBy: { createdAt: "asc" },
    });
    return Response.json(response);
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const result = ProductSchema.safeParse(product);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      return Response.json({ message: "errorMessage" });
    }

    const response = await prisma.product.create({
      data: {
        title: result.data.title,
        sold: result.data.sold,
        stock: result.data.stock,
        category: result.data.category,
      },
    });

    return Response.json({ message: "Sukses menginput data", response });
  } catch (error: unknown) {
    return Response.json({ message: "Ups terdapat error", error });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await prisma.product.delete({
    where: { id: parseInt(id!) },
  });
  return Response.json({ message: "Data berhasil di hapus" });
}

export async function PUT(request: Request) {
  try {
    const product = await request.json();
    const result = ProductSchema.safeParse(product);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      return Response.json({ message: "errorMessage" });
    }

    const response = await prisma.product.update({
      where: { id: parseInt(result.data.id!) },
      data: {
        title: result.data.title,
        sold: result.data.sold,
        stock: result.data.stock,
        category: result.data.category,
      },
    });

    return Response.json({ message: "Sukses mengupdate data", response });
  } catch (error: unknown) {
    return Response.json({ message: "Ups terdapat error", error });
  }
}
