import { z } from 'zod';

const userSchema = z.object({
  id: z.string().min(1),
  password: z
    .string()
    .min(1)
    .max(20, { message: 'Password must be less than 20 characters' }),
  needChangePassword: z.boolean().optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = userSchema;
