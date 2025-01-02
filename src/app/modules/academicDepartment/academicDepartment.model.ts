import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

const academicDepartmentSchma = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'User Name is required, please provide a unique Name.'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: [
        true,
        'Academic Faculty is required, please provide a valid Academic Faculty.',
      ],
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchma.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(404, 'Department already exist!');
  }

  next();
});

academicDepartmentSchma.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(404, 'This department does not exist!');
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchma,
);
