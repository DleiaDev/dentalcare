import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import { ClinicSchema, Clinic } from "./Clinic";

export type Holiday = {
  id: string;
  name: string;
  countryCode: string;
  entityId: string;
  entityType: "Employee" | "Clinic";
  Entity: Employee | Clinic;
  createdAt: Date;
  updatedAt: Date;
};

export const HolidaySchema: z.ZodType<Holiday> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  countryCode: z.string().max(2),
  entityId: z.string().uuid(),
  entityType: z.enum(["Employee", "Clinic"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateHolidayInputSchema = z.object({
  name: z.string(),
  countryCode: z.string(),
});
