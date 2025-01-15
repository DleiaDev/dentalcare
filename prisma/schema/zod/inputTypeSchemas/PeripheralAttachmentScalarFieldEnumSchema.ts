import { z } from 'zod';

export const PeripheralAttachmentScalarFieldEnumSchema = z.enum(['id','fileId','fileName','fileType','peripheralId','createdAt','updatedAt']);

export default PeripheralAttachmentScalarFieldEnumSchema;
