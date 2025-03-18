"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { type CreatePeripheralStatusFormData } from "@/zod/PeripheralStatus";
import { CreatePeripheralStatusServerSchema } from "@/zod/PeripheralStatus.server";

export async function createPeripheralStatus(
  formData: CreatePeripheralStatusFormData,
) {
  const result =
    await CreatePeripheralStatusServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  const tag = await prisma.peripheralStatus.create({
    data: formData,
  });

  revalidatePath("/api/trpc/peripherals.getAllStatuses");

  return {
    data: tag,
  };
}
