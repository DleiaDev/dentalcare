"use server";

import { getClinic } from "@/lib/clinic_dev";
import {
  CreateEmployeeFormData,
  CreateEmployeeFormSchema,
} from "@/zod/Employee";

export async function createEmployee(formData: CreateEmployeeFormData) {
  const clinic = getClinic();
  const result = CreateEmployeeFormSchema(clinic).safeParse(formData);

  if (!result.success) return result.error;

  return {
    message: "Success!",
  };
}
