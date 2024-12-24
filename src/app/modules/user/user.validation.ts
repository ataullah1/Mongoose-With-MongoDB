import { z } from 'zod';

const userSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(1)
    .max(20, { message: 'Password must be less than 20 characters' })
    .optional(),
});

export const UserValidation = userSchema;
