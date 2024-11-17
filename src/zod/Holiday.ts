import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import { ClinicSchema, Clinic } from "./Clinic";

export type Holiday = {
  id: string;
  name: string;
  countryCode: string;
  startDate: Date;
  endDate: Date;
  entityId: string;
  entityType: "Employee" | "Clinic";
  Entity?: Employee | Clinic;
  createdAt: Date;
  updatedAt: Date;

  // Front end
  text: string;
};

export const HolidaySchema: z.ZodType<Holiday> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  countryCode: z.string().max(2),
  startDate: z.date(),
  endDate: z.date(),
  entityId: z.string().uuid(),
  entityType: z.enum(["Employee", "Clinic"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).or(z.undefined())),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Front end
  text: z.string(),
});

export const CreateHolidayInputSchema = z.object({
  name: z.string(),
  countryCode: z.string(),
});
