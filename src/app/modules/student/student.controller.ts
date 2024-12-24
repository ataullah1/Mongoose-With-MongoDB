import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    res.status(200).json({
      success: true,
      message: 'Students are read succesfully',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single Student are read succesfully',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};
const getDeleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getDeleteStudentsDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single Student are deleted succesfully',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  getDeleteStudent,
};
