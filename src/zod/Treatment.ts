import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import { TreatmentGroup, TreatmentGroupSchema } from "./TreatmentGroup";

// ------- Model -------

export type Treatment = {
  id: string;
  Employees: Employee[];
  treatmentGroupId: string;
  TreatmentGroup: TreatmentGroup;
  createdAt: Date;
  updatedAt: Date;
};

export const TreatmentSchema: z.ZodType<Treatment> = z.object({
  id: z.string().uuid(),
  Employees: z.lazy(() => z.array(EmployeeSchema)),
  treatmentGroupId: z.string().uuid(),
  TreatmentGroup: z.lazy(() => TreatmentGroupSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});
