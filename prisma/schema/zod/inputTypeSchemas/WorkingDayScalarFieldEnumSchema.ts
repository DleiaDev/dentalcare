import { z } from 'zod';

export const WorkingDayScalarFieldEnumSchema = z.enum(['id','entityId','entityType','weekday','createdAt','updatedAt','Entity']);

export default WorkingDayScalarFieldEnumSchema;
