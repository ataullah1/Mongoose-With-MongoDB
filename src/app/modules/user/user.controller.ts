import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

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

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
