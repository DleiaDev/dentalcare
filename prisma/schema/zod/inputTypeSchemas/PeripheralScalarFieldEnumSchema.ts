import { z } from 'zod';

export const PeripheralScalarFieldEnumSchema = z.enum(['id','name','imageId','imageName','vendorId','statusId','series','categoryId','weight','sku','barcode','description','createdAt','updatedAt']);

export default PeripheralScalarFieldEnumSchema;
