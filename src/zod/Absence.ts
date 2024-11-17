import { z } from "zod";
import { Clinic, ClinicSchema } from "./Clinic";
import { Employee, EmployeeSchema } from "./Employee";

export type Absence = {
  id: string;
  name: string;
  rrule: string;
  entityId: string;
  entityType: "Employee" | "Clinic";
  Entity?: Employee | Clinic;
  createdAt: Date;
  updatedAt: Date;

  // Front-end
  text: string;
};

export const AbsenceSchema: z.ZodType<Absence> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  rrule: z.string(),
  entityId: z.string().uuid(),
  entityType: z.enum(["Employee", "Clinic"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).or(z.undefined())),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Front-end
  text: z.string(),
});

export type CreateAbsenceInput = z.infer<typeof CreateAbsenceInputSchema>;

export const CreateAbsenceInputSchema = z.object({
  name: z.string(),
  rrule: z.string(),
});
