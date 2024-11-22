import { z } from "zod";
import Holidays from "date-holidays";
import { publicProcedure, router } from "../trpc";

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
      return holidays;
    }),
});
