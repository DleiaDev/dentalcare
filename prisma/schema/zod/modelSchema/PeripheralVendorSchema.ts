import { z } from 'zod';
import { PeripheralWithRelationsSchema } from './PeripheralSchema'
import type { PeripheralWithRelations } from './PeripheralSchema'

/////////////////////////////////////////
// PERIPHERAL VENDOR SCHEMA
/////////////////////////////////////////

export const PeripheralVendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  address: z.string(),
  contact_name: z.string(),
  contact_phone: z.string(),
  contact_email: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PeripheralVendor = z.infer<typeof PeripheralVendorSchema>

/////////////////////////////////////////
// PERIPHERAL VENDOR RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralVendorRelations = {
  peripherals: PeripheralWithRelations[];
};

export type PeripheralVendorWithRelations = z.infer<typeof PeripheralVendorSchema> & PeripheralVendorRelations

export const PeripheralVendorWithRelationsSchema: z.ZodType<PeripheralVendorWithRelations> = PeripheralVendorSchema.merge(z.object({
  peripherals: z.lazy(() => PeripheralWithRelationsSchema).array(),
}))

export default PeripheralVendorSchema;
