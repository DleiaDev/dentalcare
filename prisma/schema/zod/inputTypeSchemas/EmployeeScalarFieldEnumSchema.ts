import { z } from 'zod';

export const EmployeeScalarFieldEnumSchema = z.enum(['id','name','profession','email','phone','address','employmentType','createdAt','updatedAt']);

export default EmployeeScalarFieldEnumSchema;
