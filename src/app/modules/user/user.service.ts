import { User } from './user.model';
import { TStudent } from '../student/student.interface';
import config from '../../config';
import { Tuser } from './user.interfase';
import { Student } from '../student/student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { genarateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //  create user object
  const userData: Partial<Tuser> = {};

  // iff password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //  Set Manually genarated id
    if (admissionSemester) {
      userData.id = await genarateStudentId(admissionSemester);
    } else {
      throw new Error('Admission semester not found');
    }

    // create user
    const newUser = await User.create([userData], { session });
    // Create a student
    if (!newUser.length) {
      throw new AppError(500, 'Faild to create user');
    }
    //  Set id, _id as user
    payload.id = newUser[0].id; // Embaded id
    payload.user = newUser[0]._id; // Reference _id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(500, 'Faild to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err.message);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
