"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { type CreatePeripheralCategoryFormData } from "@/zod/PeripheralCategory";
import { CreatePeripheralCategoryServerSchema } from "@/zod/PeripheralCategory.server";

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
