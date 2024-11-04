import { z } from "zod";
import { Treatment, TreatmentSchema } from "./Treatment";

// ------- Model -------

export type TreatmentGroup = {
  id: string;
  treatments: Treatment[];
  createdAt: Date;
  updatedAt: Date;
};

export const TreatmentGroupSchema: z.ZodType<TreatmentGroup> = z.object({
  id: z.string().uuid(),
  treatments: z.array(TreatmentSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------

export const CreateTreatmentGroupInputSchema = z.object({
  // Empty object as there are no required fields for creation
});

export type CreateTreatmentGroupInput = Omit<
  TreatmentGroup,
  "id" | "createdAt" | "updatedAt" | "treatments"
>;
