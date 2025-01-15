import { z } from 'zod';

export const AbsenceScalarFieldEnumSchema = z.enum(['id','name','rrule','entityId','entityType','createdAt','updatedAt','Entity']);

export default AbsenceScalarFieldEnumSchema;
