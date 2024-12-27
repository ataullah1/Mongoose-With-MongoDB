import { User } from './user.model';
import { TStudent } from '../student/student.interface';
import config from '../../config';
import { Tuser } from './user.interfase';
import { Student } from '../student.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //  create user object
  const userData: Partial<Tuser> = {};

  // iff password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';
  //  Set Manually genarated id
  userData.id = '2030100001';

  // create user
  const newUser = await User.create(userData);
  // Create a student
  if (Object.keys(newUser).length) {
    //  Set id, _id as user
    studentData.id = newUser.id; // Embaded id
    studentData.user = newUser._id; // Reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
