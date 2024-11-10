import { z } from "zod";
import { WorkingDay, WorkingDaySchema } from "./WorkingDay";

export type ClinicSettings = {
  timeFormat: "12" | "24";
  WorkingDays: WorkingDay[];
};

export const ClinicSettingsSchema: z.ZodType<ClinicSettings> = z.object({
  timeFormat: z.enum(["12", "24"]),
  WorkingDays: z.array(WorkingDaySchema),
});
