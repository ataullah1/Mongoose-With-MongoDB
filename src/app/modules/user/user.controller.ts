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
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
      error: error,
    });
  }
};
