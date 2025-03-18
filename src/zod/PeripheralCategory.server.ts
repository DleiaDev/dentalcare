import prisma from "@/lib/prisma";
import { z } from "zod";

export const CreatePeripheralCategoryServerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name is required")
    .refine(async (name) => {
      const record = await prisma.peripheralCategory.findUnique({
        where: { name },
      });
      return record === null;
    }, "Category already exists."),
  description: z.string().optional(),
});
