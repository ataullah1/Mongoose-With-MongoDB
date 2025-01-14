import { model, Schema } from 'mongoose';
import { TGurdian, Name, TStudent, StudentModel } from './student.interface';

const nameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [
      true,
      'First name is required, please provide a valid first name.',
    ],
  },
  lastName: {
    type: String,
    required: [
      true,
      'Last name is required, please provide a valid last name.',
    ],
  },
});

const gurdianSchema = new Schema<TGurdian>({
  name: {
    type: String,
    required: [true, 'Guardian name is required, please provide a valid name.'],
  },
  phone: {
    type: String,
    required: [
      true,
      'Guardian phone number is required, please provide a valid phone number.',
    ],
  },
  occupation: {
    type: String,
    required: [
      true,
      'Guardian occupation is required, please provide a valid occupation.',
    ],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required, please provide a unique ID.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required, please provide a valid ID.'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: nameSchema,
      required: [
        true,
        'Student name is required, please provide both first and last names.',
      ],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: 'Gender must be one of "male", "female", or "others".',
      },
      required: [true, 'Gender is required, please provide a valid gender.'],
    },
    dateOfBirth: {
      type: Date,
      required: [
        true,
        'Date of birth is required, please provide a valid date.',
      ],
    },
    email: {
      type: String,
      required: [
        true,
        'Email address is required, please provide a valid email.',
      ],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [
        true,
        'Contact number is required, please provide a valid number.',
      ],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          'Blood group must be one of "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", or "O-".',
      },
    },
    address: {
      type: String,
      required: [true, 'Address is required, please provide a valid address.'],
    },
    gurdian: {
      type: gurdianSchema,
      required: [
        true,
        'Guardian information is required, please provide valid details.',
      ],
    },
    profileImg: {
      type: String,
      required: [
        true,
        'Profile image URL is required, please provide a valid URL.',
      ],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);
// Virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

// Query Middleware --------
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// if i use aggregate then i have to use this way
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom Static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//  Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
