import { model, Schema } from 'mongoose';
import { Tuser } from './user.interfase';
import config from '../../config';
import bcrypt from 'bcrypt';

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

//  Pre save middleware/hook: Will work on create() save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//  Set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

export const User = model<Tuser>('User', userSchema);
