import prisma from "@/lib/prisma";
import { z } from "zod";

export const CreatePeripheralStatusServerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name is required")
    .refine(async (name) => {
      const record = await prisma.peripheralStatus.findUnique({
        where: { name },
      });
      return record === null;
    }, "Status already exists"),
  color: z
    .string({ message: "Color is required" })
    .length(7, { message: "Color is required" }),
  description: z.string().optional(),
});
