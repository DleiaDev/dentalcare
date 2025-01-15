import { z } from 'zod';

export const AbsenceEntitySchema = z.enum(['Clinic','Employee']);

export type AbsenceEntityType = `${z.infer<typeof AbsenceEntitySchema>}`

export default AbsenceEntitySchema;
