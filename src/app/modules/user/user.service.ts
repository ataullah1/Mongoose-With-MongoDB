import { User } from './user.model';
import { TStudent } from '../student/student.interface';
import config from '../../config';
import { Tuser } from './user.interfase';
import { Student } from '../student.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { genarateStudentId } from './user.utils';

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

  //  Set Manually genarated id
  if (admissionSemester) {
    userData.id = await genarateStudentId(admissionSemester);
  } else {
    throw new Error('Admission semester not found');
  }

  // create user
  const newUser = await User.create(userData);
  // Create a student
  if (Object.keys(newUser).length) {
    //  Set id, _id as user
    payload.id = newUser.id; // Embaded id
    payload.user = newUser._id; // Reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
