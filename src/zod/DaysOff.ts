import { z } from "zod";
import { Employee, EmployeeSchema } from "./Employee";

// ------- Model -------

export type DaysOff = {
  id: string;
  name: string;
  employeeId: string;
  Employee: Employee;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const DaysOffSchema: z.ZodType<DaysOff> = z.object({
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

export type CreateDaysOffInput = Omit<
  DaysOff,
  "id" | "createdAt" | "updatedAt" | "Employee"
>;

export const CreateDaysOffInputSchema = z.object({
  name: z.string(),
  employeeId: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
});
