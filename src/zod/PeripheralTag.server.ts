import prisma from "@/lib/prisma";
import { z } from "zod";

export const CreatePeripheralTagServerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name is required")
    .refine(async (name) => {
      const record = await prisma.peripheralTag.findUnique({ where: { name } });
      return record === null;
    }, "Tag already exists."),
  description: z.string().optional(),
});
