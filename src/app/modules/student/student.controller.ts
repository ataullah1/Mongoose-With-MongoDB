import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

import httpStatus from 'http-status';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students are read succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsDB(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Student are read succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getDeleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getDeleteStudentsDB(studentId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Student are deleted succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  getDeleteStudent,
};
