import { z } from "zod";
import { Treatment, TreatmentSchema } from "./Treatment";

// ------- Model -------

export type TreatmentGroup = {
  id: string;
  Treatments: Treatment[];
  createdAt: Date;
  updatedAt: Date;
};

export const TreatmentGroupSchema: z.ZodType<TreatmentGroup> = z.object({
  id: z.string().uuid(),
  Treatments: z.lazy(() => z.array(TreatmentSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});
