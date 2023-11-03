import { createUserSchema } from './../schema/create.schema';
import { z } from 'zod';

export type CreateUserDto = z.infer<typeof createUserSchema>;
