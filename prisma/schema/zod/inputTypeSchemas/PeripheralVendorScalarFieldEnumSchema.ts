import { z } from 'zod';

export const PeripheralVendorScalarFieldEnumSchema = z.enum(['id','name','description','address','contact_name','contact_phone','contact_email','createdAt','updatedAt']);

export default PeripheralVendorScalarFieldEnumSchema;
