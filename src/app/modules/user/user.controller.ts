import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentDta } = req.body;

    //  Data validation using zod
    // const zodparseData = studentValidationSchema.parse(studentDta);
    const result = await UserServices.createStudentIntoDB(password, studentDta);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student is created Succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
