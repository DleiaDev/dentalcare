import { z } from 'zod';

export const ClinicScalarFieldEnumSchema = z.enum(['id','name','email','countryCode','timeFormat']);

export default ClinicScalarFieldEnumSchema;
