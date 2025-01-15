import { z } from 'zod';

export const AbsenceEntityTypeSchema = z.enum(['CLINIC','EMPLOYEE']);

export type AbsenceEntityTypeType = `${z.infer<typeof AbsenceEntityTypeSchema>}`

export default AbsenceEntityTypeSchema;
