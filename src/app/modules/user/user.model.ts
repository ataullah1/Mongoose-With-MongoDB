import { model, Schema } from 'mongoose';
import { Tuser } from './user.interfase';

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required, please provide a unique ID.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User password is required, please provide a password.'],
    },
    needChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: [true, 'User role is required, please provide a valid role.'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: [
        true,
        'User status is required, please provide a valid status.',
      ],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<Tuser>('User', userSchema);
