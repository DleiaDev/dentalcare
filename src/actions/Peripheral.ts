"use server";

import prisma from "@/lib/prisma";
import deleteFiles from "@/lib/utils/deleteFiles";
import uploadFile from "@/lib/utils/uploadFile";
import {
  CreatePeripheralFormData,
  CreatePeripheralServerSchema,
  UpdatePeripheralFormData,
  UpdatePeripheralServerSchema,
} from "@/zod/Peripheral";
import { PeripheralWithRelations } from "@prisma/zod/modelSchema/PeripheralSchema";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

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
  let attachments: { id: string; name: string; type: string }[] = [];
  if (formData.attachments.length > 0)
    attachments = await Promise.all(
      formData.attachments.map((attachment) =>
        uploadFile(attachment, {
          folder: `dentalcare/peripherals/attachments`,
        }).then((id) => ({
          id,
          name: attachment.name,
          type: attachment.type,
        })),
      ),
    );

  const peripheral = await prisma.peripheral.create({
    data: {
      imageId,
      imageName: formData.image ? formData.image.name : undefined,
      name: formData.name,
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
            fileId: attachment.id,
            fileName: attachment.name,
            fileType: attachment.type,
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

export async function updatePeripheral(
  id: string,
  formData: UpdatePeripheralFormData,
) {
  let peripheral = await prisma.peripheral.findFirst({
    where: { id },
  });

  if (peripheral === null) notFound();

  const result = await UpdatePeripheralServerSchema.safeParseAsync(formData);

  if (!result.success)
    return {
      errors: result.error.formErrors.fieldErrors,
    };

  let imageId: string | null | undefined;
  let imageName: string | null | undefined;

  // Delete image
  if (
    (formData.image === null || formData.image instanceof File) &&
    peripheral.imageId
  ) {
    await deleteFiles(peripheral.imageId, {
      type: "upload",
      resourceType: "image",
    });
    imageId = null;
    imageName = null;
  }

  // Upload image
  if (formData.image instanceof File) {
    imageName = formData.image.name;
    imageId = await uploadFile(formData.image, {
      folder: `dentalcare/peripherals/images`,
    });
  }

  // Delete attachments
  const args = {
    where: {
      peripheralId: peripheral.id,
      id: {
        notIn: formData.attachmentIds,
      },
    },
  };
  const fileIds = await prisma.peripheralAttachment
    .findMany({ ...args, select: { fileId: true } })
    .then((rows) => rows.map((r) => r.fileId));
  if (fileIds.length > 0)
    await deleteFiles(fileIds, {
      type: "upload",
      resourceType: "image",
    });

  await prisma.peripheralAttachment.deleteMany(args);

  // Upload attachments
  let attachments: { id: string; name: string; type: string }[] = [];
  if (formData.attachments.length > 0)
    attachments = await Promise.all(
      formData.attachments.map((attachment) =>
        uploadFile(attachment, {
          folder: `dentalcare/peripherals/attachments`,
        }).then((id) => ({
          id,
          name: attachment.name,
          type: attachment.type,
        })),
      ),
    );

  peripheral = await prisma.peripheral.update({
    where: { id },
    data: {
      imageId,
      imageName,
      name: formData.name,
      vendorId: formData.vendorId,
      statusId: formData.statusId,
      series: formData.series,
      categoryId: formData.categoryId,
      weight: formData.weight,
      sku: formData.sku,
      barcode: formData.barcode,
      description: formData.description,
      Tags: {
        set: [],
        connect: formData.tagIds.map((id) => ({ id })),
      },
      Attachments: {
        createMany: {
          data: attachments.map((attachment) => ({
            fileId: attachment.id,
            fileName: attachment.name,
            fileType: attachment.type,
          })),
        },
      },
    },
    include: {
      Vendor: true,
      Category: true,
      Status: true,
      Tags: true,
      Attachments: true,
    },
  });

  return {
    data: peripheral,
  };
}
