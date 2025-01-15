import { z } from 'zod';
import { WorkingDayEntityTypeSchema } from '../inputTypeSchemas/WorkingDayEntityTypeSchema'
import { WeekdaySchema } from '../inputTypeSchemas/WeekdaySchema'
import { WorkingDayEntitySchema } from '../inputTypeSchemas/WorkingDayEntitySchema'
import { TimeSlotWithRelationsSchema } from './TimeSlotSchema'
import type { TimeSlotWithRelations } from './TimeSlotSchema'
import { ClinicWithRelationsSchema } from './ClinicSchema'
import type { ClinicWithRelations } from './ClinicSchema'
import { EmployeeWithRelationsSchema } from './EmployeeSchema'
import type { EmployeeWithRelations } from './EmployeeSchema'

/////////////////////////////////////////
// WORKING DAY SCHEMA
/////////////////////////////////////////

export const WorkingDaySchema = z.object({
  entityType: WorkingDayEntityTypeSchema,
  weekday: WeekdaySchema,
  Entity: WorkingDayEntitySchema,
  id: z.string(),
  entityId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type WorkingDay = z.infer<typeof WorkingDaySchema>

/////////////////////////////////////////
// WORKING DAY RELATION SCHEMA
/////////////////////////////////////////

export type WorkingDayRelations = {
  TimeSlots: TimeSlotWithRelations[];
  Clinic?: ClinicWithRelations | null;
  Employee?: EmployeeWithRelations | null;
};

export type WorkingDayWithRelations = z.infer<typeof WorkingDaySchema> & WorkingDayRelations

export const WorkingDayWithRelationsSchema: z.ZodType<WorkingDayWithRelations> = WorkingDaySchema.merge(z.object({
  TimeSlots: z.lazy(() => TimeSlotWithRelationsSchema).array(),
  Clinic: z.lazy(() => ClinicWithRelationsSchema).nullable(),
  Employee: z.lazy(() => EmployeeWithRelationsSchema).nullable(),
}))

export default WorkingDaySchema;
