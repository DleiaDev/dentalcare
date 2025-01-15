import { z } from 'zod';
import { PeripheralWithRelationsSchema } from './PeripheralSchema'
import type { PeripheralWithRelations } from './PeripheralSchema'

/////////////////////////////////////////
// PERIPHERAL TAG SCHEMA
/////////////////////////////////////////

export const PeripheralTagSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PeripheralTag = z.infer<typeof PeripheralTagSchema>

/////////////////////////////////////////
// PERIPHERAL TAG RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralTagRelations = {
  peripherals: PeripheralWithRelations[];
};

export type PeripheralTagWithRelations = z.infer<typeof PeripheralTagSchema> & PeripheralTagRelations

export const PeripheralTagWithRelationsSchema: z.ZodType<PeripheralTagWithRelations> = PeripheralTagSchema.merge(z.object({
  peripherals: z.lazy(() => PeripheralWithRelationsSchema).array(),
}))

export default PeripheralTagSchema;
