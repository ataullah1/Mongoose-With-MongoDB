import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty is created Succesfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsIntoDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculties is readed Succesfully',
      data: result,
    });
  },
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDB(
        departmentId,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Academic Faculty is readed Succesfully',
      data: result,
    });
  },
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty is updated Succesfully',
      data: result,
    });
  },
);

export const AcademicDepartmentControllers = {
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  createAcademicDepartment,
  updateAcademicDepartment,
};
