"use server";

import prisma from "@/lib/prisma";
import uploadFile from "@/lib/utils/uploadFile";
import {
  CreatePeripheralFormData,
  CreatePeripheralServerSchema,
} from "@/zod/Peripheral";
import { revalidatePath } from "next/cache";

export async function createPeripheral(formData: CreatePeripheralFormData) {
  const result = await CreatePeripheralServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  // Image
  let imageId: string | undefined;
  if (formData.image)
    imageId = await uploadFile(formData.image, {
      folder: `dentalcare/peripherals/images`,
    });

  // Attachments
  let attachments: { id: string; name: string }[] = [];
  if (formData.attachments.length > 0)
    attachments = await Promise.all(
      formData.attachments.map((attachment) =>
        uploadFile(attachment, {
          folder: `dentalcare/peripherals/attachments`,
        }).then((id) => ({
          id,
          name: attachment.name,
        })),
      ),
    );

  const peripheral = await prisma.peripheral.create({
    data: {
      name: formData.name,
      imageId,
      imageName: formData.image ? formData.image.name : undefined,
      vendorId: formData.vendorId,
      statusId: formData.statusId,
      series: formData.series,
      categoryId: formData.categoryId,
      weight: formData.weight,
      sku: formData.sku,
      barcode: formData.barcode,
      description: formData.description,
      Tags: {
        connect: formData.tagIds.map((id) => ({ id })),
      },
      Attachments: {
        createMany: {
          data: attachments.map((attachment) => ({
            imageId: attachment.id,
            imageName: attachment.name,
          })),
        },
      },
    },
  });

  revalidatePath("/api/trpc/peripherals.getAll");

  return {
    data: peripheral,
  };
}
