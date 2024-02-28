import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is empty" }),
  sold: z.coerce.number(),
  stock: z.coerce.number(),
  category: z.string().min(1, { message: "Category is empty." }),
});
