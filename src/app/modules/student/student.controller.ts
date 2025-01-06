import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students are read succesfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Student are read succesfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  console.log('Hello>>>>>>>> ', student);
  const result = await StudentServices.updateStudentsDB(studentId, student);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Student are updated succesfully',
    data: result,
  });
});
const getDeleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getDeleteStudentsDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Student are deleted succesfully',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  getDeleteStudent,
};
