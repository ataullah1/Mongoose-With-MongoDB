import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User Is Already Exists');
  }

  const result = await Student.create(studentData); // Built in staticc method
  // const student = new Student(studentData); // Create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User Is Already Exists');
  // }
  // const result = await student.save(); // Built in instance method
  return result;
};

const getAllStudentsDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  // Using aggregate
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const getDeleteStudentsDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsDB,
  getSingleStudentsDB,
  getDeleteStudentsDB,
};
