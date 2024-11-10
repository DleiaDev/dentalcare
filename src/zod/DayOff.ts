import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";

// ------- Model -------

export type DayOff = {
  id: string;
  name: string;
  employeeId: string;
  Employee: Employee;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const DayOffSchema: z.ZodType<DayOff> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  employeeId: z.string().uuid(),
  Employee: z.lazy(() => EmployeeSchema),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Input -------

export type CreateDayOffInput = Omit<
  DayOff,
  "id" | "createdAt" | "updatedAt" | "Employee"
>;

export const CreateDayOffInputSchema = z.object({
  name: z.string(),
  employeeId: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
});
