import { z } from 'zod';
import { PeripheralWithRelationsSchema } from './PeripheralSchema'
import type { PeripheralWithRelations } from './PeripheralSchema'

/////////////////////////////////////////
// PERIPHERAL CATEGORY SCHEMA
/////////////////////////////////////////

export const PeripheralCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PeripheralCategory = z.infer<typeof PeripheralCategorySchema>

/////////////////////////////////////////
// PERIPHERAL CATEGORY RELATION SCHEMA
/////////////////////////////////////////

export type PeripheralCategoryRelations = {
  peripherals: PeripheralWithRelations[];
};

export type PeripheralCategoryWithRelations = z.infer<typeof PeripheralCategorySchema> & PeripheralCategoryRelations

export const PeripheralCategoryWithRelationsSchema: z.ZodType<PeripheralCategoryWithRelations> = PeripheralCategorySchema.merge(z.object({
  peripherals: z.lazy(() => PeripheralWithRelationsSchema).array(),
}))

export default PeripheralCategorySchema;
