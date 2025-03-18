import { z } from "zod";
import { isPossiblePhoneNumber } from "libphonenumber-js";

export type PeripheralVendor = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralVendorSchema: z.ZodType<PeripheralVendor> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  contact_name: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ------- Forms -------

export type CreatePeripheralVendorFormData = z.infer<
  typeof CreatePeripheralVendorFormSchema
>;

export const CreatePeripheralVendorFormSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  description: z.string().optional(),
  address: z
    .string({ message: "Address is required" })
    .min(1, "Address is required"),
  contact_name: z
    .string({ message: "Contact name is required" })
    .min(1, "Contact name is required"),
  contact_phone: z
    .string({ message: "Contact phone is required" })
    .min(1, "Contact phone is required")
    .refine((val) => isPossiblePhoneNumber(val), {
      message: "Invalid phone number",
    }),
  contact_email: z
    .string({ message: "Contact email is required" })
    .min(1, "Contact email is required")
    .email(),
});
