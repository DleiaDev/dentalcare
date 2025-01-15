import { z } from 'zod';
import { PeripheralWithRelationsSchema } from './PeripheralSchema'
import type { PeripheralWithRelations } from './PeripheralSchema'

/////////////////////////////////////////
// PERIPHERAL ATTACHMENT SCHEMA
/////////////////////////////////////////

export const PeripheralAttachmentSchema = z.object({
  id: z.string(),
  fileId: z.string(),
  fileName: z.string(),
  fileType: z.string(),
  peripheralId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PeripheralAttachment = z.infer<typeof PeripheralAttachmentSchema>

/////////////////////////////////////////
// PERIPHERAL ATTACHMENT RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralAttachmentRelations = {
  peripheral: PeripheralWithRelations;
};

export type PeripheralAttachmentWithRelations = z.infer<typeof PeripheralAttachmentSchema> & PeripheralAttachmentRelations

export const PeripheralAttachmentWithRelationsSchema: z.ZodType<PeripheralAttachmentWithRelations> = PeripheralAttachmentSchema.merge(z.object({
  peripheral: z.lazy(() => PeripheralWithRelationsSchema),
}))

export default PeripheralAttachmentSchema;
