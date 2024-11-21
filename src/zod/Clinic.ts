import { z } from "zod";
import { Absence, AbsenceSchema } from "./Absence";
import { Holiday, HolidaySchema } from "./Holiday";
import { WorkingDay, WorkingDaySchema } from "./WorkingDay";

export type Clinic = {
  id: string;
  countryCode: string;
  timeFormat: "12" | "24";
  Absences: Absence[];
  Holidays: Holiday[];
  WorkingDays: WorkingDay[];
};

export const ClinicSchema: z.ZodType<Clinic> = z.object({
  id: z.string().uuid(),
  countryCode: z.string(),
  timeFormat: z.enum(["12", "24"]),
  Absences: z.lazy(() => z.array(AbsenceSchema)),
  Holidays: z.lazy(() => z.array(HolidaySchema)),
  WorkingDays: z.lazy(() => z.array(WorkingDaySchema)),
});
