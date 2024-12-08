import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import {
  CreateTimeSlotsFormSchema,
  TimeSlot,
  TimeSlotSchema,
} from "./TimeSlot";
import { Weekday, WeekdayEnum } from "./utils/weekday";
import { Clinic, ClinicSchema } from "./Clinic";
import { formatTime } from "@/lib/utils";

// ------- Model -------

export type WorkingDay = {
  id: string;
  entityId: string;
  entityType: "CLINIC" | "EMPLOYEE";
  weekday: Weekday;
  TimeSlots: TimeSlot[];
  createdAt: Date;
  updatedAt: Date;
  Entity?: Employee | Clinic;
};

export const WorkingDaySchema: z.ZodType<WorkingDay> = z.object({
  id: z.string().uuid(),
  entityId: z.string().uuid(),
  entityType: z.enum(["CLINIC", "EMPLOYEE"]),
  weekday: WeekdayEnum,
  TimeSlots: z.array(TimeSlotSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).optional()),
});

// ------- Forms -------

export type CreateWorkingDayInput = z.infer<
  ReturnType<typeof CreateWorkingDayFormSchema>
>;

export const CreateWorkingDayFormSchema = (clinic: Clinic) => {
  const dayToStartAndEndTime = clinic.WorkingDays.reduce(
    (acc, workingDay) => {
      const startTime = workingDay.TimeSlots[0].startTime;
      const endTime =
        workingDay.TimeSlots[workingDay.TimeSlots.length - 1].endTime;
      acc[workingDay.weekday] = { startTime, endTime };
      return acc;
    },
    {} as Record<
      Weekday,
      { startTime: TimeSlot["startTime"]; endTime: TimeSlot["endTime"] }
    >,
  );

  return z
    .object({
      weekday: WeekdayEnum,
      TimeSlots: CreateTimeSlotsFormSchema,
    })
    .superRefine((workingDay, ctx) => {
      const { startTime: clinicStartTime, endTime: clinicEndTime } =
        dayToStartAndEndTime[workingDay.weekday];
      const { startTime: employeeStartTime } = workingDay.TimeSlots[0];
      const { endTime: employeeEndTime } =
        workingDay.TimeSlots[workingDay.TimeSlots.length - 1];
      if (employeeStartTime < clinicStartTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Start time can't be earlier then clinic's start time (${formatTime(clinic.timeFormat, clinicStartTime)})`,
          path: ["TimeSlots", 0, "startTime"],
          fatal: true,
        });
        return z.NEVER;
      }
      if (clinicEndTime < employeeEndTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `End time can't be later then clinic's end time (${formatTime(clinic.timeFormat, clinicEndTime)})`,
          path: ["TimeSlots", workingDay.TimeSlots.length - 1, "endTime"],
          fatal: true,
        });
        return z.NEVER;
      }
    });
};

export const CreateWorkingDaysFormSchema = (clinic: Clinic) =>
  CreateWorkingDayFormSchema(clinic).array();
