import prisma from "@/lib/prisma";
import { z } from "zod";

export type PeripheralStatus = {
  id: string;
  name: string;
  description: string | null;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralStatusSchema: z.ZodType<PeripheralStatus> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Forms -------

export type CreatePeripheralStatusFormData = z.infer<
  typeof CreatePeripheralStatusFormSchema
>;

export const CreatePeripheralStatusFormSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  color: z
    .string({ message: "Color is required" })
    .length(7, { message: "Color is required" }),
  description: z.string().optional(),
});

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
