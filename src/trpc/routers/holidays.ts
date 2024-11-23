import { z } from "zod";
import Holidays, { HolidaysTypes } from "date-holidays";
import { publicProcedure, router } from "../trpc";

function deduplicateHolidays(holidays: HolidaysTypes.Holiday[]) {
  // Create a map to store unique holidays
  const uniqueHolidaysMap = new Map<string, any>();

  // Process each holiday
  for (const holiday of holidays) {
    const { name, end } = holiday;

    // If holiday doesn't exist in map, add it
    if (!uniqueHolidaysMap.has(name)) {
      uniqueHolidaysMap.set(name, { ...holiday });
    } else {
      // Update the existing holiday with the latest end date
      const existingHoliday = uniqueHolidaysMap.get(name);
      existingHoliday.end = end;
    }
  }

  // Convert map back to array and sort if needed
  return Array.from(uniqueHolidaysMap.values());
}

export const holidaysRouter = router({
  // Get all countries
  getAllCountries: publicProcedure.query(() => {
    const hd = new Holidays();
    const countries = Object.entries(hd.getCountries("en")).map((country) => ({
      code: country[0],
      name: country[1],
      flag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country[0]}.svg`,
    }));
    return countries;
  }),

  // Get holiday by country
  getHolidayByCountry: publicProcedure
    .input(
      z.object({
        countryCode: z.string(),
      }),
    )
    .query(({ input }) => {
      const hd = new Holidays();
      const year = new Date().getFullYear();
      hd.init(input.countryCode);
      const holidays = hd.getHolidays(year, "en");
      return deduplicateHolidays(holidays);
    }),
});
