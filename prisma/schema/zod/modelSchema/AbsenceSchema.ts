import { z } from 'zod';
import { AbsenceEntityTypeSchema } from '../inputTypeSchemas/AbsenceEntityTypeSchema'
import { AbsenceEntitySchema } from '../inputTypeSchemas/AbsenceEntitySchema'
import { ClinicWithRelationsSchema } from './ClinicSchema'
import type { ClinicWithRelations } from './ClinicSchema'
import { EmployeeWithRelationsSchema } from './EmployeeSchema'
import type { EmployeeWithRelations } from './EmployeeSchema'

/////////////////////////////////////////
// ABSENCE SCHEMA
/////////////////////////////////////////

export const AbsenceSchema = z.object({
  entityType: AbsenceEntityTypeSchema,
  Entity: AbsenceEntitySchema,
  id: z.string(),
  name: z.string(),
  rrule: z.string(),
  entityId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Absence = z.infer<typeof AbsenceSchema>

/////////////////////////////////////////
// ABSENCE RELATION SCHEMA
/////////////////////////////////////////

export type AbsenceRelations = {
  Clinic?: ClinicWithRelations | null;
  Employee?: EmployeeWithRelations | null;
};

export type AbsenceWithRelations = z.infer<typeof AbsenceSchema> & AbsenceRelations

export const AbsenceWithRelationsSchema: z.ZodType<AbsenceWithRelations> = AbsenceSchema.merge(z.object({
  Clinic: z.lazy(() => ClinicWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeeWithRelationsSchema).nullable(),
}))

export default AbsenceSchema;
