import { Response } from "express";

export const sendError = (
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: unknown
) => {
  return res.status(status).json({
    error: {
      code,
      message,
      details,
    },
  });
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit) || 1;
  return res.json({
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  });
};
