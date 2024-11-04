import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";
import { TimeSlot, TimeSlotSchema } from "./TimeSlot";
import { DayOfWeek, DayOfWeekEnum } from "./utils/dayOfWeek";

// ------- Model -------

export type WorkingDay = {
  id: string;
  employeeId: string;
  Employee: Employee;
  dayOfWeek: DayOfWeek;
  timeSlots: TimeSlot[];
  createdAt: Date;
  updatedAt: Date;
};

export const WorkingDaySchema: z.ZodType<WorkingDay> = z.object({
  id: z.string().uuid(),
  employeeId: z.string().uuid(),
  Employee: z.lazy(() => EmployeeSchema),
  dayOfWeek: DayOfWeekEnum,
  timeSlots: z.array(TimeSlotSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------

export type CreateWorkingDayInput = Omit<
  WorkingDay,
  "id" | "createdAt" | "updatedAt" | "Employee" | "timeSlots"
>;

export const CreateWorkingDayInputSchema = z.object({
  employeeId: z.string().uuid(),
  dayOfWeek: DayOfWeekEnum,
});
