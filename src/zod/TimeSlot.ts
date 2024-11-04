import { z } from "zod";
import { WorkingDay, WorkingDaySchema } from "./WorkingDay";

// ------- Model -------

export type TimeSlot = {
  id: string;
  workingDayId: string;
  WorkingDay: WorkingDay;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const TimeSlotSchema: z.ZodType<TimeSlot> = z.object({
  id: z.string().uuid(),
  workingDayId: z.string().uuid(),
  WorkingDay: z.lazy(() => WorkingDaySchema),
  startTime: z.date(),
  endTime: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------

export type CreateTimeSlotInput = Omit<
  TimeSlot,
  "id" | "createdAt" | "updatedAt" | "WorkingDay"
>;

export const CreateTimeSlotInputSchema = z.object({
  workingDayId: z.string().uuid(),
  startTime: z.date(),
  endTime: z.date(),
});
