"use server";

import prisma from "@/lib/prisma";
import {
  type CreatePeripheralVendorFormData,
  CreatePeripheralVendorServerSchema,
} from "@/zod/PeripheralVendor";
import { revalidatePath } from "next/cache";

export async function createPeripheralVendor(
  formData: CreatePeripheralVendorFormData,
) {
  const result =
    await CreatePeripheralVendorServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  const tag = await prisma.peripheralVendor.create({
    data: formData,
  });

  revalidatePath("/api/trpc/peripherals.getAllVendors");

  return {
    data: tag,
  };
}