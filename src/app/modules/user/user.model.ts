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
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
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
