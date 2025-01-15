import { z } from 'zod';

export const TimeSlotScalarFieldEnumSchema = z.enum(['id','workingDayId','startTime','endTime','createdAt','updatedAt']);

export default TimeSlotScalarFieldEnumSchema;
