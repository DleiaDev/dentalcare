"use server";

import prisma from "@/lib/prisma";
import {
  type CreatePeripheralCategoryFormData,
  CreatePeripheralCategoryServerSchema,
} from "@/zod/PeripheralCategory";
import { revalidatePath } from "next/cache";

export async function createPeripheralCategory(
  formData: CreatePeripheralCategoryFormData,
) {
  const result =
    await CreatePeripheralCategoryServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  const tag = await prisma.peripheralCategory.create({
    data: formData,
  });

  revalidatePath("/api/trpc/peripherals.getAllCategories");

  return {
    data: tag,
  };
}
