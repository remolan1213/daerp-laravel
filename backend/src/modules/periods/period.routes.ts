import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../core/prisma";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";

const router = Router();

const createPeriodSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    cutoffType: z.string().min(1),
    year: z.coerce.number().int(),
    isFinalized: z.boolean().optional()
  })
  .superRefine((value, ctx) => {
    if (value.endDate < value.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "endDate must be greater than or equal to startDate",
        path: ["endDate"]
      });
    }
  });

router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const payload = createPeriodSchema.parse(req.body);
    const period = await prisma.payrollPeriod.create({ data: payload });
    res.status(201).json(period);
  })
);

router.get(
  "/",
  authenticate,
  asyncHandler(async (_, res) => {
    const periods = await prisma.payrollPeriod.findMany({
      orderBy: [{ year: "desc" }, { startDate: "desc" }]
    });
    res.json(periods);
  })
);

export default router;
