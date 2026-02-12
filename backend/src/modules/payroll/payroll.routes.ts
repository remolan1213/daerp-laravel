import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";
import { prisma } from "../../core/prisma";
import { PayrollService } from "./payroll.service";

const router = Router();
const service = new PayrollService();

const runPayrollSchema = z.object({
  employeeId: z.string().uuid(),
  periodId: z.string().uuid()
});

router.post(
  "/run",
  authenticate,
  asyncHandler(async (req, res) => {
    const { employeeId, periodId } = runPayrollSchema.parse(req.body);
    const payroll = await service.runPayroll(employeeId, periodId);
    res.status(201).json(payroll);
  })
);

router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const employeeId = req.query.employeeId ? z.string().uuid().parse(req.query.employeeId) : undefined;
    const payrolls = await prisma.payroll.findMany({
      where: employeeId ? { employeeId } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeCode: true }
        },
        period: {
          select: { startDate: true, endDate: true, cutoffType: true, year: true }
        },
        governmentRateTable: {
          select: { name: true, effectiveFrom: true }
        },
        cashAdvanceDeductions: {
          include: {
            cashAdvance: {
              select: { reason: true, grantedAt: true }
            }
          }
        }
      }
    });
    res.json(payrolls);
  })
);

export default router;
