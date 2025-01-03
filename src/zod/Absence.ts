import { z } from "zod";
import { Clinic, ClinicSchema } from "./Clinic";
import { Employee, EmployeeSchema } from "./Employee";
import { WeekdayShortEnum } from "./utils/weekday";

export type Absence = {
  id: string;
  name: string;
  rrule: string;
  entityId: string;
  entityType: "EMPLOYEE" | "CLINIC";
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
  entityType: z.enum(["EMPLOYEE", "CLINIC"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).optional()),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Front-end
  text: z.string(),
});

// ------- Forms -------

export const CreateAbsenceFormSchema = z.object({
  key: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  entityType: z.enum(["EMPLOYEE", "CLINIC"]),
  dtstart: z.string(),
  frequency: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]),
  interval: z.number().positive().optional(),
  weeklyByWeekday: z.array(WeekdayShortEnum).min(1).optional(),
  monthlyByDay_Nth: z.enum(["-1", "1", "2", "3", "4"]).optional(),
  monthlyByDay_Weekday: WeekdayShortEnum.optional(),
  monthlyByMonthday_Day: z.number().max(31).min(1).optional(),
  yearlyByDay_Nth: z.enum(["-1", "1", "2", "3", "4"]).optional(),
  yearlyByDay_Weekday: WeekdayShortEnum.optional(),
  yearlyByDay_Month: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]).optional(), // prettier-ignore
  yearlyByMonthday_Day: z.number().max(31).min(1).optional(),
  yearlyByMonthday_Month: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]).optional(), // prettier-ignore
  until: z.string().optional(),
  count: z.number().positive().optional(),

  // Additional
  by: z.enum(["BYDAY", "BYMONTHDAY"]).optional(),
  endType: z.enum(["Never", "After", "On date"]).optional(),
});

export type CreateAbsenceFormData = z.infer<typeof CreateAbsenceFormSchema> & {
  text: string;
};
