import { z } from 'zod';
import { TreatmentWithRelationsSchema } from './TreatmentSchema'
import type { TreatmentWithRelations } from './TreatmentSchema'

/////////////////////////////////////////
// TREATMENT GROUP SCHEMA
/////////////////////////////////////////

export const TreatmentGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TreatmentGroup = z.infer<typeof TreatmentGroupSchema>

/////////////////////////////////////////
// TREATMENT GROUP RELATION SCHEMA
/////////////////////////////////////////

export type TreatmentGroupRelations = {
  Treatments: TreatmentWithRelations[];
};

export type TreatmentGroupWithRelations = z.infer<typeof TreatmentGroupSchema> & TreatmentGroupRelations

export const TreatmentGroupWithRelationsSchema: z.ZodType<TreatmentGroupWithRelations> = TreatmentGroupSchema.merge(z.object({
  Treatments: z.lazy(() => TreatmentWithRelationsSchema).array(),
}))

export default TreatmentGroupSchema;
