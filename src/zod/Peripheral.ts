import { z } from "zod";
import { MAXIMUM_B, MAXIMUM_MB } from "@/constants/storage";

export const CreatePeripheralFormSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .superRefine((file, ctx) => {
      if (!file) return;
      if (file.size > MAXIMUM_B)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
        });
    }),
  Tags: z.string().uuid().array(),
  Status: z.string().uuid(),
  name: z.string(),
  series: z.string(),
  Category: z.string().uuid(),
  // weight: z.number(),
});
