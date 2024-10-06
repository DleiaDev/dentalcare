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
