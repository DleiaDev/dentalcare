import { z } from "zod";
import { Clinic } from "./Clinic";
import { CreateHolidaysFormSchema, HolidaySchema } from "./Holiday";
import { Treatment, TreatmentSchema } from "./Treatment";
import {
  CreateWorkingDaysFormSchema,
  WorkingDay,
  WorkingDaySchema,
} from "./WorkingDay";
import { EmploymentType, EmploymentTypeEnum } from "./utils/employmentType";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import { CreateAbsenceFormSchema } from "./Absence";

const MAXIMUM_MB = 5;
const MAXIMUM_SIZE = MAXIMUM_MB * 1000000;

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
  Treatments: z.lazy(() => z.array(TreatmentSchema)),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Model -------

export type CreateEmployeeFormData = z.infer<
  ReturnType<typeof CreateEmployeeFormSchema>
>;

export const CreateEmployeeFormSchema = (clinic: Clinic) => {
  return z.object({
    // Step 1
    avatar: z
      .instanceof(File)
      .optional()
      .superRefine((file, ctx) => {
        if (!file) return;
        if (file.size > MAXIMUM_SIZE)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
          });
      }),
    employmentType: EmploymentTypeEnum,
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must contain at least 2 characters" }),
    profession: z.string({ message: "Profession is required" }),
    phone: z
      .string({ message: "Phone is required" })
      .refine((val) => isPossiblePhoneNumber(val), {
        message: "Invalid phone number",
      }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    address: z.string().min(1, { message: "Address is required" }),

    // Step 2
    services: z.number().array(),

    // Step 3
    WorkingDays: CreateWorkingDaysFormSchema(clinic),

    // Step 4
    Holidays: CreateHolidaysFormSchema,
    Absences: CreateAbsenceFormSchema.array(),
  });
};
