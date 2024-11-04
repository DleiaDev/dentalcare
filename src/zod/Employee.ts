import { z } from "zod";
import { DaysOff, DaysOffSchema } from "./DaysOff";
import { Treatment, TreatmentSchema } from "./Treatment";
import { WorkingDay, WorkingDaySchema } from "./WorkingDay";
import { EmploymentType, EmploymentTypeEnum } from "./utils/employmentType";

// ------- Model -------

export type Employee = {
  id: string;
  name: string;
  profession: string;
  email: string;
  phone: string;
  address: string;
  employmentType: EmploymentType;
  WorkingDays: WorkingDay[];
  DaysOff: DaysOff[];
  Treatments: Treatment[];
  createdAt: Date;
  updatedAt: Date;
};

export const EmployeeSchema: z.ZodType<Employee> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  profession: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  employmentType: EmploymentTypeEnum,
  WorkingDays: z.array(WorkingDaySchema),
  DaysOff: z.array(DaysOffSchema),
  Treatments: z.array(z.lazy(() => TreatmentSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Model -------

export type CreateEmployeeInput = Omit<
  Employee,
  "id" | "createdAt" | "updatedAt" | "WorkingDays" | "DaysOff" | "Treatments"
>;

export const CreateEmployeeInputSchema = z.object({
  name: z.string(),
  profession: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  employmentType: EmploymentTypeEnum,
});
