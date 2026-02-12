import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "./http";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      issues: err.issues
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  }

  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}
