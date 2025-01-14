import { Response } from 'express';

type TREsponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TREsponse<T>) => {
  res.status(data.statusCode).json({
    success: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
