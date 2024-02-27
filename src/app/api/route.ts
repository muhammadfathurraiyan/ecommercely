import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await prisma.product.findMany();
  return Response.json(result);
}

export async function POST(request: Request) {
  try {
    const product = await request.json();
    const result = await prisma.product.create({
      data: product,
    });
    return Response.json({ message: "success", result });
  } catch (error: unknown) {
    return Response.json({ message: "error", error });
  }
}
