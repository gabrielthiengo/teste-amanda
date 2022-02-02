import { NextFunction, Request, Response } from "express"
import { InternalError } from "../entities/InternalError";

export const errorMiddleware = (error: InternalError, req: Request, res: Response, next: NextFunction) => {
  if(error) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message
    });
  }

  return next(error);
}