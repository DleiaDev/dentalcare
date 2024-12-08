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
  entityType: "EMPLOYEE" | "CLINIC";
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
  entityType: z.enum(["EMPLOYEE", "CLINIC"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).or(z.undefined())),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Front end
  text: z.string(),
});

// ------- Forms -------

export type CreateHolidayFormData = z.infer<typeof CreateHolidayFormSchema>;

export const CreateHolidayFormSchema = z.object({
  key: z.string(),
  entityType: z.enum(["EMPLOYEE", "CLINIC"]),
  countryCode: z.string(),
  holidayObjId: z.string().refine((holidayObjId) => holidayObjId !== "", {
    message: "Holiday is required",
  }),
  holidayObj: z.object({
    name: z.string(),
    date: z.string(),
  }),
  text: z.string(), // For display purposes
});

export type CreateHolidaysFormData = z.infer<typeof CreateHolidaysFormSchema>;

export const CreateHolidaysFormSchema =
  CreateHolidayFormSchema.array().superRefine((holidays, ctx) => {
    const countryToHolidayObjId = {} as Record<
      CreateHolidayFormData["countryCode"],
      CreateHolidayFormData["holidayObjId"][]
    >;
    holidays.forEach((holiday, index) => {
      if (!countryToHolidayObjId[holiday.countryCode])
        countryToHolidayObjId[holiday.countryCode] = [holiday.holidayObjId];
      else if (
        !countryToHolidayObjId[holiday.countryCode].includes(
          holiday.holidayObjId,
        )
      )
        countryToHolidayObjId[holiday.countryCode].push(holiday.holidayObjId);
      else
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You have already selected this holiday",
          path: [index, "holidayObjId"],
          fatal: true,
        });
    });
  });
