import { z } from "zod";

export type PeripheralCategory = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralCategorySchema: z.ZodType<PeripheralCategory> = z.object(
  {
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  },
);

// ------- Forms -------

export type CreatePeripheralCategoryFormData = z.infer<
  typeof CreatePeripheralCategoryFormSchema
>;

export const CreatePeripheralCategoryFormSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  description: z.string().optional(),
});
