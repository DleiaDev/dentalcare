import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import {
  CreateTimeSlotsInputSchema,
  TimeSlot,
  TimeSlotSchema,
} from "./TimeSlot";
import { DayOfWeek, DayOfWeekEnum } from "./utils/dayOfWeek";
import { ClinicSettings } from "./ClinicSettings";
import { formatTime } from "@/lib/utils";

// ------- Model -------

export type WorkingDay = {
  id: string;
  employeeId: string;
  Employee: Employee;
  dayOfWeek: DayOfWeek;
  TimeSlots: TimeSlot[];
  createdAt: Date;
  updatedAt: Date;
};

export const WorkingDaySchema: z.ZodType<WorkingDay> = z.object({
  id: z.string().uuid(),
  employeeId: z.string().uuid(),
  Employee: z.lazy(() => EmployeeSchema),
  dayOfWeek: DayOfWeekEnum,
  TimeSlots: z.array(TimeSlotSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------
export type CreateWorkingDayInput = z.infer<
  ReturnType<typeof CreateWorkingDayInputSchema>
>;
export const CreateWorkingDayInputSchema = (clinicSettings: ClinicSettings) => {
  const dayToStartAndEndTime = clinicSettings.WorkingDays.reduce(
    (acc, workingDay) => {
      const startTime = workingDay.TimeSlots[0].startTime;
      const endTime =
        workingDay.TimeSlots[workingDay.TimeSlots.length - 1].endTime;
      acc[workingDay.dayOfWeek] = { startTime, endTime };
      return acc;
    },
    {} as Record<
      DayOfWeek,
      { startTime: TimeSlot["startTime"]; endTime: TimeSlot["endTime"] }
    >,
  );

  return z.object({
    WorkingDays: z
      .object({
        dayOfWeek: DayOfWeekEnum,
        TimeSlots: CreateTimeSlotsInputSchema,
      })
      .superRefine((workingDay, ctx) => {
        const { startTime: clinicStartTime, endTime: clinicEndTime } =
          dayToStartAndEndTime[workingDay.dayOfWeek];
        const { startTime: employeeStartTime } = workingDay.TimeSlots[0];
        const { endTime: employeeEndTime } =
          workingDay.TimeSlots[workingDay.TimeSlots.length - 1];
        if (employeeStartTime < clinicStartTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Start time can't be earlier then clinic's start time (${formatTime(clinicSettings.timeFormat, clinicStartTime)})`,
            path: ["TimeSlots", 0, "startTime"],
            fatal: true,
          });
          return z.NEVER;
        }
        if (clinicEndTime < employeeEndTime) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `End time can't be later then clinic's end time (${formatTime(clinicSettings.timeFormat, clinicEndTime)})`,
            path: ["TimeSlots", workingDay.TimeSlots.length - 1, "endTime"],
            fatal: true,
          });
          return z.NEVER;
        }
      })
      .array(),
  });
};
