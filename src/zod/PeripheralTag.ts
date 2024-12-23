import prisma from "@/lib/prisma";
import { z } from "zod";

export type PeripheralTag = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralTagSchema: z.ZodType<PeripheralTag> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreatePeripheralTagFormData = z.infer<
  typeof CreatePeripheralTagFormSchema
>;

export const CreatePeripheralTagFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const CreatePeripheralTagServerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine(async (name) => {
      const record = await prisma.peripheralTag.findUnique({ where: { name } });
      return record === null;
    }, "Tag already exists."),
  description: z.string().optional(),
});
