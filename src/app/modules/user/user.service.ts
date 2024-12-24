import { User } from './user.model';
import { Tuser } from './user.interfase';

const createUserIntoDB = async (userData: Tuser) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User Is Already Exists');
  //   }
  const result = await User.create(studentData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
