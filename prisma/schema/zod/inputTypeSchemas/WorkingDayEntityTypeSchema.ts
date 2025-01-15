import { z } from 'zod';

export const WorkingDayEntityTypeSchema = z.enum(['CLINIC','EMPLOYEE']);

export type WorkingDayEntityTypeType = `${z.infer<typeof WorkingDayEntityTypeSchema>}`

export default WorkingDayEntityTypeSchema;
