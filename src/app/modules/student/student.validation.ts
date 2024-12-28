import { z } from 'zod';

const createNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error:
        'First name is required, please provide a valid first name.',
    })
    .nonempty('First name cannot be empty.'),
  lastName: z
    .string({
      required_error:
        'Last name is required, please provide a valid last name.',
    })
    .nonempty('Last name cannot be empty.'),
});

const createGuardianValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Guardian name is required, please provide a valid name.',
    })
    .nonempty('Guardian name cannot be empty.'),
  phone: z
    .string({
      required_error:
        'Guardian phone number is required, please provide a valid phone number.',
    })
    .nonempty('Guardian phone number cannot be empty.'),
  occupation: z
    .string({
      required_error:
        'Guardian occupation is required, please provide a valid occupation.',
    })
    .nonempty('Guardian occupation cannot be empty.'),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createNameValidationSchema,
      gender: z.enum(['male', 'female', 'others'], {
        invalid_type_error:
          'Gender must be one of "male", "female", or "others".',
        required_error: 'Gender is required, please provide a valid gender.',
      }),
      dateOfBirth: z.date({
        required_error:
          'Date of birth is required, please provide a valid date.',
      }),
      email: z
        .string({
          required_error:
            'Email address is required, please provide a valid email.',
        })
        .email('Invalid email format.'),
      contactNo: z
        .string({
          required_error:
            'Contact number is required, please provide a valid number.',
        })
        .nonempty('Contact number cannot be empty.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      address: z
        .string({
          required_error:
            'Address is required, please provide a valid address.',
        })
        .nonempty('Address cannot be empty.'),
      gurdian: createGuardianValidationSchema,
      profileImg: z
        .string({
          required_error:
            'Profile image URL is required, please provide a valid URL.',
        })
        .url('Invalid URL format.'),
    }),
  }),
});

// Exporting the Zod schema
export const studentValidations = {
  createStudentValidationSchema,
};
