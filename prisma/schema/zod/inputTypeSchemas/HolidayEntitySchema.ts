import { z } from 'zod';

export const HolidayEntitySchema = z.enum(['Clinic','Employee']);

export type HolidayEntityType = `${z.infer<typeof HolidayEntitySchema>}`

export default HolidayEntitySchema;
