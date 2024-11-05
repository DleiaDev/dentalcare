import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import { TreatmentGroup, TreatmentGroupSchema } from "./TreatmentGroup";

// ------- Model -------

export type Treatment = {
  id: string;
  employee: Employee[];
  treatmentGroupId: string;
  TreatmentGroup: TreatmentGroup;
  createdAt: Date;
  updatedAt: Date;
};

export const TreatmentSchema: z.ZodType<Treatment> = z.object({
  id: z.string().uuid(),
  employee: z.array(EmployeeSchema),
  treatmentGroupId: z.string().uuid(),
  TreatmentGroup: z.lazy(() => TreatmentGroupSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------

export type CreateTreatmentInput = Omit<
  Treatment,
  "id" | "createdAt" | "updatedAt" | "employee" | "TreatmentGroup"
>;

export const CreateTreatmentInputSchema = z.object({
  treatmentGroupId: z.string().uuid(),
});