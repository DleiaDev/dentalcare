import { z } from "zod";

export const Weekdays = [
  { long: "Monday", short: "MO" },
  { long: "Tuesday", short: "TU" },
  { long: "Wednesday", short: "WE" },
  { long: "Thursday", short: "TH" },
  { long: "Friday", short: "FR" },
  { long: "Saturday", short: "SA" },
  { long: "Sunday", short: "SU" },
];

export const WeekdayEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export type Weekday = z.infer<typeof WeekdayEnum>;

export const WeekdayShortEnum = z.enum([
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU",
]);

export type WeekdayShort = z.infer<typeof WeekdayShortEnum>;
