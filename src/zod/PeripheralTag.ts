import { z } from "zod";

export type PeripheralTag = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralTagSchema: z.ZodType<PeripheralTag> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
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
