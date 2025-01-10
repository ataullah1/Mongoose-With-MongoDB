import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting default value---
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  const errorSources = [{}];

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
