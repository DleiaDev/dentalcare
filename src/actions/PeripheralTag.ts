"use server";

import prisma from "@/lib/prisma";
import {
  type CreatePeripheralTagFormData,
  CreatePeripheralTagServerSchema,
} from "@/zod/PeripheralTag";
import { revalidatePath } from "next/cache";

export async function createPeripheralTag(
  formData: CreatePeripheralTagFormData,
) {
  const result = await CreatePeripheralTagServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  const tag = await prisma.peripheralTag.create({
    data: formData,
  });

  revalidatePath("/api/trpc/peripherals.getAllTags");

  return {
    data: tag,
  };
}
