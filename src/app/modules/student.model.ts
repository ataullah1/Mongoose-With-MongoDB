import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TGurdian,
  Name,
  TStudent,
  StudentModel,
} from './student/student.interface';
import config from '../config';

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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required, please provide a unique ID.'],
    unique: true,
  },
  password: {
    type: String,
    required: [
      true,
      'Student password is required, please provide a password.',
    ],
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
    type: String,
    required: [true, 'Date of birth is required, please provide a valid date.'],
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
  isActive: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'Status must be either "active" or "inactive".',
    },
    default: 'active',
  },
});

//  Pre save middleware/hook: Will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook: We will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//  Post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

// Query Middleware --------
studentSchema.pre('find', function (next) {
  this.find;
});

// Creating a custom Static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Creating a custom instence method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

//  Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
