import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentDta } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentDta);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created Succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
