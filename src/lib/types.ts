import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Nama barang kosong" }),
  sold: z.coerce.number(),
  stock: z.coerce.number(),
  category: z.string().min(1, { message: "Jenis barang kosong" }),
});
