import { z } from 'zod';

export const HolidayEntityTypeSchema = z.enum(['CLINIC','EMPLOYEE']);

export type HolidayEntityTypeType = `${z.infer<typeof HolidayEntityTypeSchema>}`

export default HolidayEntityTypeSchema;
