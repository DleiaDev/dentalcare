import { z } from 'zod';

export const PeripheralStatusScalarFieldEnumSchema = z.enum(['id','name','description','color','createdAt','updatedAt']);

export default PeripheralStatusScalarFieldEnumSchema;
