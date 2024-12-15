"use server";

import { CreatePeripheralTagFormData } from "@/zod/PeripheralTag";

export async function createPeripheralTag(
  formData: CreatePeripheralTagFormData,
) {
  const delay = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(3000);

  return {
    message: "Success!",
  };
}
