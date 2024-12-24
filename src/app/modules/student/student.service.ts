import { Student } from '../student.model';

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
  getAllStudentsDB,
  getSingleStudentsDB,
  getDeleteStudentsDB,
};
