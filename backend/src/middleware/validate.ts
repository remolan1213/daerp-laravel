import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/http";

const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === "";

const isNumberLike = (value: unknown) =>
  value === undefined || value === null || value === "" || Number.isFinite(Number(value));

export const validateWorkerPayload = (req: Request, res: Response, next: NextFunction) => {
  const { idNumber, department, bankAccount, firstName, lastName, firstname, lastname } = req.body;
  const resolvedFirstName = firstName ?? firstname;
  const resolvedLastName = lastName ?? lastname;

  if (
    isEmpty(idNumber) ||
    isEmpty(department) ||
    isEmpty(bankAccount) ||
    isEmpty(resolvedFirstName) ||
    isEmpty(resolvedLastName)
  ) {
    return sendError(res, 400, "VALIDATION_ERROR", "Missing required fields");
  }
  return next();
};

export const validatePayrollPayload = (req: Request, res: Response, next: NextFunction) => {
  const {
    payrollPeriod,
    payrollDate,
    grossAmount,
    grossAmount2,
    netAmount,
    netAmount2,
    deductionAmount,
    totalAmount,
    rate,
  } = req.body;

  if (isEmpty(payrollPeriod) || isEmpty(payrollDate)) {
    return sendError(res, 400, "VALIDATION_ERROR", "Missing payrollPeriod or payrollDate");
  }

  const numericFields = [
    grossAmount,
    grossAmount2,
    netAmount,
    netAmount2,
    deductionAmount,
    totalAmount,
    rate,
  ];
  if (numericFields.some((value) => !isNumberLike(value))) {
    return sendError(res, 400, "VALIDATION_ERROR", "Invalid numeric value in payload");
  }

  return next();
};
