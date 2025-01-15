import { z } from 'zod';
import { PeripheralWithRelationsSchema } from './PeripheralSchema'
import type { PeripheralWithRelations } from './PeripheralSchema'

/////////////////////////////////////////
// PERIPHERAL STATUS SCHEMA
/////////////////////////////////////////

export const PeripheralStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PeripheralStatus = z.infer<typeof PeripheralStatusSchema>

/////////////////////////////////////////
// PERIPHERAL STATUS RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralStatusRelations = {
  peripherals: PeripheralWithRelations[];
};

export type PeripheralStatusWithRelations = z.infer<typeof PeripheralStatusSchema> & PeripheralStatusRelations

export const PeripheralStatusWithRelationsSchema: z.ZodType<PeripheralStatusWithRelations> = PeripheralStatusSchema.merge(z.object({
  peripherals: z.lazy(() => PeripheralWithRelationsSchema).array(),
}))

export default PeripheralStatusSchema;
