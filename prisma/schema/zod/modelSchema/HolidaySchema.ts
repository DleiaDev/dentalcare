import { z } from 'zod';
import { HolidayEntityTypeSchema } from '../inputTypeSchemas/HolidayEntityTypeSchema'
import { HolidayEntitySchema } from '../inputTypeSchemas/HolidayEntitySchema'
import { ClinicWithRelationsSchema } from './ClinicSchema'
import type { ClinicWithRelations } from './ClinicSchema'
import { EmployeeWithRelationsSchema } from './EmployeeSchema'
import type { EmployeeWithRelations } from './EmployeeSchema'

/////////////////////////////////////////
// HOLIDAY SCHEMA
/////////////////////////////////////////

export const HolidaySchema = z.object({
  entityType: HolidayEntityTypeSchema,
  Entity: HolidayEntitySchema,
  id: z.string(),
  name: z.string(),
  countryCode: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  entityId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Holiday = z.infer<typeof HolidaySchema>

/////////////////////////////////////////
// HOLIDAY RELATION SCHEMA
/////////////////////////////////////////

export type HolidayRelations = {
  Clinic?: ClinicWithRelations | null;
  Employee?: EmployeeWithRelations | null;
};

export type HolidayWithRelations = z.infer<typeof HolidaySchema> & HolidayRelations

export const HolidayWithRelationsSchema: z.ZodType<HolidayWithRelations> = HolidaySchema.merge(z.object({
  Clinic: z.lazy(() => ClinicWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeeWithRelationsSchema).nullable(),
}))

export default HolidaySchema;
