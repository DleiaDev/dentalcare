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
  Vendor: z
    .string({ message: "Vendor is required" })
    .uuid({ message: "Vendor is required" }),
  Tags: z.string().uuid().array(),
  Status: z.string().uuid().optional(),
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  series: z.string().optional(),
  Category: z.string().uuid().optional(),
  weight: z.number().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  attachments: z
    .instanceof(File)
    .array()
    .optional()
    .superRefine((files, ctx) => {
      if (!files) return;
      files.forEach((file) => {
        if (file.size > MAXIMUM_B)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
          });
      });
    }),
});
