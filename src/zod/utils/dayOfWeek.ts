import { z } from "zod";

export const DaysOfWeek = [
  { long: "Monday", short: "MO" },
  { long: "Tuesday", short: "TU" },
  { long: "Wednesday", short: "WE" },
  { long: "Thursday", short: "TH" },
  { long: "Friday", short: "FR" },
  { long: "Saturday", short: "SA" },
  { long: "Sunday", short: "SU" },
];

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
