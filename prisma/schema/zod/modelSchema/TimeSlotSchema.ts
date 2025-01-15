import { z } from 'zod';
import { WorkingDayWithRelationsSchema } from './WorkingDaySchema'
import type { WorkingDayWithRelations } from './WorkingDaySchema'

/////////////////////////////////////////
// TIME SLOT SCHEMA
/////////////////////////////////////////

export const TimeSlotSchema = z.object({
  id: z.string(),
  workingDayId: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TimeSlot = z.infer<typeof TimeSlotSchema>

/////////////////////////////////////////
// TIME SLOT RELATION SCHEMA
/////////////////////////////////////////

export type TimeSlotRelations = {
  WorkingDay: WorkingDayWithRelations;
};

export type TimeSlotWithRelations = z.infer<typeof TimeSlotSchema> & TimeSlotRelations

export const TimeSlotWithRelationsSchema: z.ZodType<TimeSlotWithRelations> = TimeSlotSchema.merge(z.object({
  WorkingDay: z.lazy(() => WorkingDayWithRelationsSchema),
}))

export default TimeSlotSchema;
