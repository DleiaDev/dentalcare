import { z } from "zod";
import { WorkingDay, WorkingDaySchema } from "./WorkingDay";

// ------- Model -------

export type TimeSlot = {
  id: string;
  workingDayId: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
  WorkingDay?: WorkingDay;
};

export const TimeSlotSchema: z.ZodType<TimeSlot> = z.object({
  id: z.string().uuid(),
  workingDayId: z.string().uuid(),
  startTime: z.string().time(),
  endTime: z.string().time(),
  createdAt: z.date(),
  updatedAt: z.date(),
  WorkingDay: z.lazy(() => WorkingDaySchema.optional()),
});

// ------- Forms -------

export const CreateTimeSlotFormSchema = z
  .object({
    id: z.string(),
    startTime: z.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
      message: "Start time is required",
    }),
    endTime: z.string().regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, {
      message: "End time is required",
    }),
  })
  .superRefine((timeSlot, ctx) => {
    if (!timeSlot.startTime || !timeSlot.endTime) return z.NEVER; // This prevents from showing below errors when new time slot is added
    if (timeSlot.startTime >= timeSlot.endTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start time must be earlier then end time",
        path: ["startTime"],
        fatal: true,
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be later then start time",
        path: ["endTime"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const CreateTimeSlotsFormSchema =
  CreateTimeSlotFormSchema.array().superRefine((timeSlots, ctx) => {
    timeSlots.forEach((timeSlot, timeSlotIndex) => {
      const nextTimeSlotsStartTime = timeSlots[timeSlotIndex + 1]?.startTime;
      if (!nextTimeSlotsStartTime) return;
      if (timeSlot.endTime >= nextTimeSlotsStartTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End time must be earlier then next timeslot's start time",
          path: [timeSlotIndex, "endTime"],
          fatal: true,
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start time must be later then previous timeslot's end time",
          path: [timeSlotIndex + 1, "startTime"],
          fatal: true,
        });
        return z.NEVER;
      }
    });
  });
