import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is created Succesfully',
    data: result,
  });
});

const getAllAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is readed Succesfully',
    data: result,
  });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { semesterId: string } = req.params;
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterIntoDB(semesterId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester is readed Succesfully',
      data: result,
    });
  },
);

export const AcademicSemesterControllers = {
  getAllAcademicSemester,
  getSingleAcademicSemester,
  createAcademicSemester,
};
