import Holidays from "date-holidays";
import { Rule, Schedule } from "@/lib/rschedule";

export async function GET(request: Request) {
  const hd = new Holidays("RS", {
    languages: "en",
  });
  const response = hd.getHolidays(2025);

  return Response.json(response);
}
