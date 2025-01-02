import prisma from "@/lib/prisma";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export type PeripheralVendor = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const PeripheralVendorSchema: z.ZodType<PeripheralVendor> = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
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

export const CreatePeripheralVendorServerSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name is required")
    .refine(async (name) => {
      const record = await prisma.peripheralVendor.findUnique({
        where: { name },
      });
      return record === null;
    }, "Vendor already exists"),
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
