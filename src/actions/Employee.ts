"use server";

import { getClinic } from "@/lib/clinic_dev";
import {
  CreateEmployeeFormData,
  CreateEmployeeFormSchema,
} from "@/zod/Employee";

export async function createEmployee(formData: CreateEmployeeFormData) {
  const clinic = getClinic();
  const result = CreateEmployeeFormSchema(clinic).safeParse(formData);

  const delay = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(3000);

  if (!result.success) return result.error;

  return {
    message: "Success!",
  };
}
