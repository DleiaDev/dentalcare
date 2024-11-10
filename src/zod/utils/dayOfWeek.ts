import { z } from "zod";

export const DayOfWeekEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export type DayOfWeek = z.infer<typeof DayOfWeekEnum>;
