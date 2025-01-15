import { z } from 'zod';

export const HolidayScalarFieldEnumSchema = z.enum(['id','name','countryCode','startDate','endDate','entityId','entityType','createdAt','updatedAt','Entity']);

export default HolidayScalarFieldEnumSchema;
