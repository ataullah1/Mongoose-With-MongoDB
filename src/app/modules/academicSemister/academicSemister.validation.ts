import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const AcademicSemisterValidation = {
  createAcademicValidationSchema,
};
