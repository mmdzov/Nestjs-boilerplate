import { createUserSchema } from './../schema/create.schema';
import { z } from 'zod';

export type createUserDto = z.infer<typeof createUserSchema>;
