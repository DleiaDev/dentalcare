import { z } from "zod";
import { MAXIMUM_B, MAXIMUM_MB } from "@/constants/storage";
import isImage from "@/lib/utils/isImage";

export { PeripheralSchema } from "../../prisma/schema/zod/modelSchema/PeripheralSchema";

export const CreatePeripheralFormSchema = z.object({
  image: z
    .instanceof(File)
    .nullish()
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
  statusId: z.string().uuid().nullish(),
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  series: z.string().nullish(),
  categoryId: z.string().uuid().nullish(),
  weight: z.number().nullish(),
  sku: z.string().nullish(),
  barcode: z.string().nullish(),
  description: z.string().nullish(),
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

export const UpdatePeripheralFormSchema = CreatePeripheralFormSchema.extend({
  attachmentIds: z.string().uuid().array(),
});

export type UpdatePeripheralFormData = z.infer<
  typeof UpdatePeripheralFormSchema
>;

export const UpdatePeripheralServerSchema = UpdatePeripheralFormSchema;
