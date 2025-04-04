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

// ------- Forms -------

export type CreateTreatmentFormData = z.infer<typeof CreateTreatmentFormSchema>;

export const CreateTreatmentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z
    .string({ message: "You have to choose at least one" })
    .min(1, "Category name can't be blank"),
});
