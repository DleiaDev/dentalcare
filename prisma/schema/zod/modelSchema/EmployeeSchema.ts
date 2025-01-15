import { z } from 'zod';
import { EmploymentTypeSchema } from '../inputTypeSchemas/EmploymentTypeSchema'
import { AbsenceWithRelationsSchema } from './AbsenceSchema'
import type { AbsenceWithRelations } from './AbsenceSchema'
import { HolidayWithRelationsSchema } from './HolidaySchema'
import type { HolidayWithRelations } from './HolidaySchema'
import { TreatmentWithRelationsSchema } from './TreatmentSchema'
import type { TreatmentWithRelations } from './TreatmentSchema'
import { WorkingDayWithRelationsSchema } from './WorkingDaySchema'
import type { WorkingDayWithRelations } from './WorkingDaySchema'

/////////////////////////////////////////
// EMPLOYEE SCHEMA
/////////////////////////////////////////

export const EmployeeSchema = z.object({
  employmentType: EmploymentTypeSchema,
  id: z.string(),
  name: z.string(),
  profession: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Employee = z.infer<typeof EmployeeSchema>

/////////////////////////////////////////
// EMPLOYEE RELATION SCHEMA
/////////////////////////////////////////

export type EmployeeRelations = {
  Absences: AbsenceWithRelations[];
  Holidays: HolidayWithRelations[];
  Treatments: TreatmentWithRelations[];
  WorkingDays: WorkingDayWithRelations[];
};

export type EmployeeWithRelations = z.infer<typeof EmployeeSchema> & EmployeeRelations

export const EmployeeWithRelationsSchema: z.ZodType<EmployeeWithRelations> = EmployeeSchema.merge(z.object({
  Absences: z.lazy(() => AbsenceWithRelationsSchema).array(),
  Holidays: z.lazy(() => HolidayWithRelationsSchema).array(),
  Treatments: z.lazy(() => TreatmentWithRelationsSchema).array(),
  WorkingDays: z.lazy(() => WorkingDayWithRelationsSchema).array(),
}))

export default EmployeeSchema;
