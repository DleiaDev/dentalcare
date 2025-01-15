import { z } from 'zod';

export const WeekdaySchema = z.enum(['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']);

export type WeekdayType = `${z.infer<typeof WeekdaySchema>}`

export default WeekdaySchema;
