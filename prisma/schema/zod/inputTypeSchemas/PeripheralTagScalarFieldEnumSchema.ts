import { z } from 'zod';

export const PeripheralTagScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export default PeripheralTagScalarFieldEnumSchema;
