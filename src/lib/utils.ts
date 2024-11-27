import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAmPmTime(date: Date) {
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

export function getWeekOfMonth(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const offsetDate = date.getDate() + firstWeekday - 1;
  const index = 1;
  const weeksInMonth =
    index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7);
  const week = index + Math.floor(offsetDate / 7);
  return week;
  // if (exact || week < 2 + index) return week;
  // return week === weeksInMonth ? index + 5 : week;
}

export function toDateInput(date: Date) {
  return date.toISOString().split("T")[0];
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function formatTime(type: "12" | "24", time: string) {
  const d = new Date("1970-01-01 " + time);
  return d.toLocaleTimeString("en", {
    hourCycle: `h${type}`,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function areEqualDates(date1: Date, date2: Date) {
  return date1.getTime() === date2.getTime();
}
