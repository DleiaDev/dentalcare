import { z } from "zod";

export const EmploymentTypeEnum = z.enum(["FULL_TIME", "PART_TIME"], {
  message: "You have to choose at least one",
});
export type EmploymentType = z.infer<typeof EmploymentTypeEnum>;
