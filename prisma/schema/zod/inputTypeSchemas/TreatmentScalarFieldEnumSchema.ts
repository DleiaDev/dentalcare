import { z } from 'zod';

export const TreatmentScalarFieldEnumSchema = z.enum(['id','treatmentGroupId','createdAt','updatedAt']);

export default TreatmentScalarFieldEnumSchema;
