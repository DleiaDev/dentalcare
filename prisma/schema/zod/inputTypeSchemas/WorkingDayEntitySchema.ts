import { z } from 'zod';

export const WorkingDayEntitySchema = z.enum(['Clinic','Employee']);

export type WorkingDayEntityType = `${z.infer<typeof WorkingDayEntitySchema>}`

export default WorkingDayEntitySchema;
