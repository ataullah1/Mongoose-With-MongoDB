import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentDta } = req.body;

    //  Data validation using zod
    // const zodparseData = studentValidationSchema.parse(studentDta);
    const result = await UserServices.createStudentIntoDB(password, studentDta);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
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

export const UserControllers = {
  createStudent,
};
