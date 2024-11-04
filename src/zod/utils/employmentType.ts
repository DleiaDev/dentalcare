import { z } from "zod";

export const EmploymentTypeEnum = z.enum(["FULL_TIME", "PART_TIME"]);
export type EmploymentType = z.infer<typeof EmploymentTypeEnum>;
