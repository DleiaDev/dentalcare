import { CreateAbsenceFormData } from "@/zod/Absence";
import { WeekdayShort } from "@/zod/utils/weekday";
import { RRule, Weekday } from "rrule";

type WithoutTextFormData = Omit<CreateAbsenceFormData, "text">;

function getFrequency(data: WithoutTextFormData) {
  let freq;
  switch (data.frequency) {
    case "Daily":
      freq = RRule.DAILY;
      break;
    case "Weekly":
      freq = RRule.WEEKLY;
      break;
    case "Monthly":
      freq = RRule.MONTHLY;
      break;
    case "Yearly":
      freq = RRule.YEARLY;
      break;
    default:
      break;
  }
  return freq;
}

function toWeekday(weekdayStr: WeekdayShort, nth?: number): Weekday {
  let weekday;
  switch (weekdayStr) {
    case "MO":
      weekday = RRule.MO;
      break;
    case "TU":
      weekday = RRule.TU;
      break;
    case "WE":
      weekday = RRule.WE;
      break;
    case "TH":
      weekday = RRule.TH;
      break;
    case "FR":
      weekday = RRule.FR;
      break;
    case "SA":
      weekday = RRule.SA;
      break;
    case "SU":
      weekday = RRule.SU;
      break;
  }
  return nth ? weekday.nth(nth) : weekday;
}

function getByWeekday(
  data: WithoutTextFormData,
): Weekday | Weekday[] | undefined {
  if (data.yearlyByDay_Weekday) {
    const nth = data.yearlyByDay_Nth ? Number(data.yearlyByDay_Nth) : undefined;
    return toWeekday(data.yearlyByDay_Weekday, nth);
  } else if (data.monthlyByDay_Weekday) {
    const nth = data.monthlyByDay_Nth
      ? Number(data.monthlyByDay_Nth)
      : undefined;
    return toWeekday(data.monthlyByDay_Weekday, nth);
  } else if (data.frequency === "Weekly" && data.weeklyByWeekday) {
    return data.weeklyByWeekday.map((day) => toWeekday(day));
  }
}

function getByMonth(data: WithoutTextFormData) {
  if (data.yearlyByDay_Month) return Number(data.yearlyByDay_Month);
  if (data.yearlyByMonthday_Month) return Number(data.yearlyByMonthday_Month);
}

function getByMonthDay(data: WithoutTextFormData) {
  if (data.monthlyByMonthday_Day) return Number(data.monthlyByMonthday_Day);
  if (data.yearlyByMonthday_Day) return Number(data.yearlyByMonthday_Day);
}

export function formDataToRRule(data: WithoutTextFormData) {
  const freq = getFrequency(data);
  const byweekday = getByWeekday(data);
  const bymonth = getByMonth(data);
  const bymonthday = getByMonthDay(data);
  const rrule = new RRule({
    freq,
    interval: data.interval,
    dtstart: new Date(data.dtstart),
    byweekday,
    bymonthday,
    bymonth,
    count: data.count,
    until: data.until ? new Date(data.until) : undefined,
  });
  return rrule;
}
