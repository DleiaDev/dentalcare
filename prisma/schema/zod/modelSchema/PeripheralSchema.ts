import { z } from 'zod';
import { PeripheralVendorWithRelationsSchema } from './PeripheralVendorSchema'
import type { PeripheralVendorWithRelations } from './PeripheralVendorSchema'
import { PeripheralCategoryWithRelationsSchema } from './PeripheralCategorySchema'
import type { PeripheralCategoryWithRelations } from './PeripheralCategorySchema'
import { PeripheralStatusWithRelationsSchema } from './PeripheralStatusSchema'
import type { PeripheralStatusWithRelations } from './PeripheralStatusSchema'
import { PeripheralTagWithRelationsSchema } from './PeripheralTagSchema'
import type { PeripheralTagWithRelations } from './PeripheralTagSchema'
import { PeripheralAttachmentWithRelationsSchema } from './PeripheralAttachmentSchema'
import type { PeripheralAttachmentWithRelations } from './PeripheralAttachmentSchema'

/////////////////////////////////////////
// PERIPHERAL SCHEMA
/////////////////////////////////////////

export const PeripheralSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageId: z.string().nullable(),
  imageName: z.string().nullable(),
  vendorId: z.string(),
  statusId: z.string().nullable(),
  series: z.string().nullable(),
  categoryId: z.string().nullable(),
  weight: z.number().nullable(),
  sku: z.string().nullable(),
  barcode: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Peripheral = z.infer<typeof PeripheralSchema>

/////////////////////////////////////////
// PERIPHERAL RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralRelations = {
  Vendor: PeripheralVendorWithRelations;
  Category?: PeripheralCategoryWithRelations | null;
  Status?: PeripheralStatusWithRelations | null;
  Tags: PeripheralTagWithRelations[];
  Attachments: PeripheralAttachmentWithRelations[];
};

export type PeripheralWithRelations = z.infer<typeof PeripheralSchema> & PeripheralRelations

export const PeripheralWithRelationsSchema: z.ZodType<PeripheralWithRelations> = PeripheralSchema.merge(z.object({
  Vendor: z.lazy(() => PeripheralVendorWithRelationsSchema),
  Category: z.lazy(() => PeripheralCategoryWithRelationsSchema).nullable(),
  Status: z.lazy(() => PeripheralStatusWithRelationsSchema).nullable(),
  Tags: z.lazy(() => PeripheralTagWithRelationsSchema).array(),
  Attachments: z.lazy(() => PeripheralAttachmentWithRelationsSchema).array(),
}))

export default PeripheralSchema;
