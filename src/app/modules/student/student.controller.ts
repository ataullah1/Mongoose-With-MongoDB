import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentDta } = req.body;

    //  Data validation using zod
    const zodparseData = studentValidationSchema.parse(studentDta);

    const result = await StudentServices.createStudentIntoDB(zodparseData);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    res.status(200).json({
      success: true,
      message: 'Students are read succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
