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

export type HolidayFormData = {
  key: string;
  name: string;
  countryCode: string;
  startDate: Date;
  endDate: Date;
  entityType: "Employee" | "Clinic";
  text: string;
};

export type HolidayForm = z.infer<typeof HolidayFormSchema>;

export const HolidayFormSchema = z.object({
  holidays: z
    .object({
      key: z.string(),
      countryCode: z.string(),
      holidayObjId: z.string().refine((holidayObjId) => holidayObjId !== "", {
        message: "Holiday is required",
      }),
      holidayObj: z.object({
        name: z.string(),
        start: z.date(),
        end: z.date(),
      }),
    })
    .array()
    .superRefine((holidays, ctx) => {
      const countryToHolidayObjId = {} as Record<
        HolidayForm["holidays"][number]["countryCode"],
        HolidayForm["holidays"][number]["holidayObjId"][]
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
    }),
});
