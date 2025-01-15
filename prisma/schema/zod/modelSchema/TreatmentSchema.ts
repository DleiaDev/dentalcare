import { z } from 'zod';
import { EmployeeWithRelationsSchema } from './EmployeeSchema'
import type { EmployeeWithRelations } from './EmployeeSchema'
import { TreatmentGroupWithRelationsSchema } from './TreatmentGroupSchema'
import type { TreatmentGroupWithRelations } from './TreatmentGroupSchema'

/////////////////////////////////////////
// TREATMENT SCHEMA
/////////////////////////////////////////

export const TreatmentSchema = z.object({
  id: z.string(),
  treatmentGroupId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Treatment = z.infer<typeof TreatmentSchema>

/////////////////////////////////////////
// TREATMENT RELATION SCHEMA
/////////////////////////////////////////

export type TreatmentRelations = {
  Employee: EmployeeWithRelations[];
  TreatmentGroup: TreatmentGroupWithRelations;
};

export type TreatmentWithRelations = z.infer<typeof TreatmentSchema> & TreatmentRelations

export const TreatmentWithRelationsSchema: z.ZodType<TreatmentWithRelations> = TreatmentSchema.merge(z.object({
  Employee: z.lazy(() => EmployeeWithRelationsSchema).array(),
  TreatmentGroup: z.lazy(() => TreatmentGroupWithRelationsSchema),
}))

export default TreatmentSchema;
