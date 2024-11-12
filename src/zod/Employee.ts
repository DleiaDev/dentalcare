import { z } from "zod";
import { HolidaySchema } from "./Holiday";
import { DayOff, DayOffSchema } from "./DayOff";
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
  DayOff: DayOff[];
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
  WorkingDays: z.lazy(() => z.array(WorkingDaySchema)),
  Holidays: z.lazy(() => z.array(HolidaySchema)),
  DayOff: z.lazy(() => z.array(DayOffSchema)),
  Treatments: z.lazy(() => z.array(TreatmentSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Model -------

export type CreateEmployeeInput = Omit<
  Employee,
  "id" | "createdAt" | "updatedAt" | "WorkingDays" | "DayOff" | "Treatments"
>;

export const CreateEmployeeInputSchema = z.object({
  name: z.string(),
  profession: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  employmentType: EmploymentTypeEnum,
});
