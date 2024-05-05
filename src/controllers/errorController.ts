import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export default function (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const err = error;
  err.statusCode = err.statusCode || 500;
  err.status = err.status;
  err.message = err.message;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}
