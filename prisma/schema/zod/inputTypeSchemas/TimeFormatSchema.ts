import { z } from 'zod';

export const TimeFormatSchema = z.enum(['TWELVE','TWENTYFOUR']);

export type TimeFormatType = `${z.infer<typeof TimeFormatSchema>}`

export default TimeFormatSchema;
