import { z } from "zod";
import { MAXIMUM_B, MAXIMUM_MB } from "@/constants/storage";
import isImage from "@/lib/utils/isImage";

export const CreatePeripheralFormSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .superRefine((file, ctx) => {
      if (!file) return;
      if (!isImage(file))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File is not of supported image formats`,
        });
      if (file.size > MAXIMUM_B)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File is too large, the limit is ${MAXIMUM_MB}MB`,
        });
    }),
  vendorId: z
    .string({ message: "Vendor is required" })
    .uuid({ message: "Vendor is required" }),
  tagIds: z.string().uuid().array(),
  statusId: z.string().uuid().optional(),
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  series: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  weight: z.number().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  attachments: z
    .instanceof(File)
    .array()
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

export type CreatePeripheralFormData = z.infer<
  typeof CreatePeripheralFormSchema
>;

export const CreatePeripheralServerSchema = CreatePeripheralFormSchema;
