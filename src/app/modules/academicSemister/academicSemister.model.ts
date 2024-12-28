import { model, Schema } from 'mongoose';
import {
  TAcademicSemister,
  TAcademicSemisterCode,
  TAcademicSemisterName,
  TMonths,
} from './academicSemister.interfase';

const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemisterName: TAcademicSemisterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
const AcademicSemisterCode: TAcademicSemisterCode[] = ['01', '02', '03'];

const academicSemisterSchema = new Schema<TAcademicSemister>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName,
    },
    year: {
      type: Date,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicSemister = model<TAcademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
