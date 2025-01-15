import { z } from 'zod';
import { TimeFormatSchema } from '../inputTypeSchemas/TimeFormatSchema'
import { AbsenceWithRelationsSchema } from './AbsenceSchema'
import type { AbsenceWithRelations } from './AbsenceSchema'
import { HolidayWithRelationsSchema } from './HolidaySchema'
import type { HolidayWithRelations } from './HolidaySchema'
import { WorkingDayWithRelationsSchema } from './WorkingDaySchema'
import type { WorkingDayWithRelations } from './WorkingDaySchema'

/////////////////////////////////////////
// CLINIC SCHEMA
/////////////////////////////////////////

export const ClinicSchema = z.object({
  timeFormat: TimeFormatSchema,
  id: z.string(),
  name: z.string(),
  email: z.string(),
  countryCode: z.string(),
})

export type Clinic = z.infer<typeof ClinicSchema>

/////////////////////////////////////////
// CLINIC RELATION SCHEMA
/////////////////////////////////////////

export type ClinicRelations = {
  Absences: AbsenceWithRelations[];
  Holidays: HolidayWithRelations[];
  WorkingDays: WorkingDayWithRelations[];
};

export type ClinicWithRelations = z.infer<typeof ClinicSchema> & ClinicRelations

export const ClinicWithRelationsSchema: z.ZodType<ClinicWithRelations> = ClinicSchema.merge(z.object({
  Absences: z.lazy(() => AbsenceWithRelationsSchema).array(),
  Holidays: z.lazy(() => HolidayWithRelationsSchema).array(),
  WorkingDays: z.lazy(() => WorkingDayWithRelationsSchema).array(),
}))

export default ClinicSchema;
