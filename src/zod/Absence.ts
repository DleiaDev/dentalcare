import { z } from "zod";
import { Clinic, ClinicSchema } from "./Clinic";
import { Employee, EmployeeSchema } from "./Employee";
import { DayOfWeekShort, DayOfWeekShortEnum } from "./utils/dayOfWeek";

export type Absence = {
  id: string;
  name: string;
  rrule: string;
  entityId: string;
  entityType: "Employee" | "Clinic";
  Entity?: Employee | Clinic;
  createdAt: Date;
  updatedAt: Date;

  // Front-end
  text: string;
};

export const AbsenceSchema: z.ZodType<Absence> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  rrule: z.string(),
  entityId: z.string().uuid(),
  entityType: z.enum(["Employee", "Clinic"]),
  Entity: z.lazy(() => EmployeeSchema.or(ClinicSchema).or(z.undefined())),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Front-end
  text: z.string(),
});

// Absence form schema
export const CreateAbsenceFormSchema = z.object({
  key: z.string(),
  name: z.string(),
  entityType: z.enum(["Employee", "Clinic"]),
  dtstart: z.string(),
  frequency: z.enum(["Daily", "Weekly", "Monthly", "Yearly"]),
  byDayNum: z.enum(["-1", "1", "2", "3", "4"]).optional(),
  byDay: z.array(DayOfWeekShortEnum).min(1).optional(),
  byMonthDay: z.number().max(31).min(1).optional(),
  byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]).optional(), // prettier-ignore
  byDayOfWeek: DayOfWeekShortEnum.optional(),
  interval: z.number().positive().optional(),
  until: z.string().optional(),
  count: z.number().positive().optional(),

  // Additional
  by: z.enum(["BYDAY", "BYMONTHDAY"]).optional(),
  endType: z.enum(["Never", "After", "On date"]).optional(),
});

export type CreateAbsenceFormData = {
  key: string;
  name: string;
  entityType: Absence["entityType"];
  dtstart: string;
} & (
  | {
      count: number;
    }
  | {
      until: string;
    }
  | {
      count: never;
      until: never;
    }
) &
  (
    | {
        frequency: "Daily";
        interval: number;
      }
    | {
        frequency: "Weekly";
        interval: number;
        byDayOfWeek: DayOfWeekShort[];
      }
    | (
        | {
            byMonthDay: number;
          }
        | {
            byDayNum: ("-1" | "1" | "2" | "3" | "4")[];
            byDayOfWeek: DayOfWeekShort;
          }
      )
    | (
        | {
            byMonthDay: number;
            byMonth: ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12")[]; // prettier-ignore
          }
        | {
            byDayOfWeek: DayOfWeekShort;
            byDayNum: ("-1" | "1" | "2" | "3" | "4")[];
            byMonth: ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12")[]; // prettier-ignore
          }
      )
  );

// // Daily frequency with count
// const DailyFrequencyWithCount = z.object({
//   frequency: z.literal("Daily"),
//   type: z.literal("DailyCount"),
//   interval: z.number(),
//   count: z.number(),
// });
//
// // Daily frequency with until
// const DailyFrequencyWithUntil = z.object({
//   frequency: z.literal("Daily"),
//   type: z.literal("DailyUntil"),
//   interval: z.number(),
//   until: z.date(),
// });
//
// // Weekly frequency with count
// const WeeklyFrequencyWithCount = z.object({
//   frequency: z.literal("Weekly"),
//   type: z.literal("WeeklyCount"),
//   interval: z.number(),
//   byDay: z.array(DayOfWeekShortEnum).min(1),
//   count: z.number(),
// });
//
// // Weekly frequency with until
// const WeeklyFrequencyWithUntil = z.object({
//   frequency: z.literal("Weekly"),
//   type: z.literal("WeeklyUntil"),
//   interval: z.number(),
//   byDay: z.array(DayOfWeekShortEnum).min(1),
//   until: z.date(),
// });
//
// // Monthly frequency - Month day with count
// const MonthlyFrequencyMonthDayCount = z.object({
//   frequency: z.literal("Monthly"),
//   type: z.literal("MonthlyMonthDayCount"),
//   interval: z.number(),
//   by: z.literal("Month day"),
//   byMonthDay: z.number().max(31).min(1),
//   count: z.number(),
// });
//
// // Monthly frequency - Month day with until
// const MonthlyFrequencyMonthDayUntil = z.object({
//   frequency: z.literal("Monthly"),
//   type: z.literal("MonthlyMonthDayUntil"),
//   interval: z.number(),
//   by: z.literal("Month day"),
//   byMonthDay: z.number().max(31).min(1),
//   until: z.date(),
// });
//
// // Monthly frequency - Day with count
// const MonthlyFrequencyDayCount = z.object({
//   frequency: z.literal("Monthly"),
//   type: z.literal("MonthlyDayCount"),
//   interval: z.number(),
//   by: z.literal("Day"),
//   byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//   byDayOfWeek: DayOfWeekShortEnum,
//   count: z.number(),
// });
//
// // Monthly frequency - Day with until
// const MonthlyFrequencyDayUntil = z.object({
//   frequency: z.literal("Monthly"),
//   type: z.literal("MonthlyDayUntil"),
//   interval: z.number(),
//   by: z.literal("Day"),
//   byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//   byDayOfWeek: DayOfWeekShortEnum,
//   until: z.date(),
// });
//
// // Yearly frequency - Month day with count
// const YearlyFrequencyMonthDayCount = z.object({
//   frequency: z.literal("Yearly"),
//   type: z.literal("YearlyMonthDayCount"),
//   byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//   by: z.literal("Month day"),
//   byMonthDay: z.number().max(31).min(1),
//   count: z.number(),
// });
//
// // Yearly frequency - Month day with until
// const YearlyFrequencyMonthDayUntil = z.object({
//   frequency: z.literal("Yearly"),
//   type: z.literal("YearlyMonthDayUntil"),
//   byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//   by: z.literal("Month day"),
//   byMonthDay: z.number().max(31).min(1),
//   until: z.date(),
// });
//
// // Yearly frequency - Day with count
// const YearlyFrequencyDayCount = z.object({
//   frequency: z.literal("Yearly"),
//   type: z.literal("YearlyDayCount"),
//   byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//   by: z.literal("Day"),
//   byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//   count: z.number(),
// });
//
// // Yearly frequency - Day with until
// const YearlyFrequencyDayUntil = z.object({
//   frequency: z.literal("Yearly"),
//   type: z.literal("YearlyDayUntil"),
//   byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//   by: z.literal("Day"),
//   byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//   until: z.date(),
// });
//
// // Absence Form Schema
// export const AbsenceFormSchema = z.discriminatedUnion("type", [
//   DailyFrequencyWithCount,
//   DailyFrequencyWithUntil,
//   WeeklyFrequencyWithCount,
//   WeeklyFrequencyWithUntil,
//   MonthlyFrequencyMonthDayCount,
//   MonthlyFrequencyMonthDayUntil,
//   MonthlyFrequencyDayCount,
//   MonthlyFrequencyDayUntil,
//   YearlyFrequencyMonthDayCount,
//   YearlyFrequencyMonthDayUntil,
//   YearlyFrequencyDayCount,
//   YearlyFrequencyDayUntil,
// ]);

// const EndSchema = z.union([
//   z.object({
//     count: z.number().positive(),
//     until: z.undefined(),
//   }),
//   z.object({
//     count: z.undefined(),
//     until: z.string(),
//   }),
//   z.object({
//     count: z.undefined(),
//     until: z.undefined(),
//   }),
// ]);
//
// const DailySchema = z
//   .object({
//     frequency: z.literal("Daily"),
//     dtstart: z.string(),
//     interval: z.number().positive(),
//   })
//   .and(EndSchema);
//
// const WeeklySchema = z
//   .object({
//     frequency: z.literal("Weekly"),
//     dtstart: z.string(),
//     interval: z.number().positive(),
//     byDay: z.array(DayOfWeekShortEnum).min(1),
//   })
//   .and(EndSchema);
//
// const MonthlySchema = z
//   .object({
//     frequency: z.literal("Monthly"),
//     dtstart: z.string(),
//     interval: z.number().positive(),
//   })
//   .and(EndSchema)
//   .and(
//     z.union([
//       z.object({
//         byMonthDay: z.number().max(31).min(1),
//       }),
//       z.object({
//         byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//         byDayOfWeek: DayOfWeekShortEnum,
//       }),
//     ]),
//   );
//
// const YearlySchema = z
//   .object({
//     frequency: z.literal("Yearly"),
//     dtstart: z.string(),
//     interval: z.number().positive(),
//   })
//   .and(EndSchema)
//   .and(
//     z.union([
//       z.object({
//         byMonthDay: z.number().max(31).min(1),
//         byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//       }),
//       z.object({
//         byDayNum: z.enum(["-1", "1", "2", "3", "4"]),
//         byDayOfWeek: DayOfWeekShortEnum,
//         byMonth: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]), // prettier-ignore
//       }),
//     ]),
//   );
//
// const CreateAbsenceFormSchemaV2 = z.discriminatedUnion("frequency", [
//   DailySchema,
//   WeeklySchema,
//   MonthlySchema,
//   YearlySchema,
// ]);
