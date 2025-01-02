import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchma = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: [true, 'User Name is required, please provide a unique Name.'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchma,
);
