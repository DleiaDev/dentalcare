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

export const DayOfWeekShortEnum = z.enum([
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU",
]);

export type DayOfWeekShort = z.infer<typeof DayOfWeekShortEnum>;
