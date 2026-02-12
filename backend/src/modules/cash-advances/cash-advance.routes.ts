import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";
import { prisma } from "../../core/prisma";
import { HttpError } from "../../core/http";

const router = Router();

const createCashAdvanceSchema = z.object({
  employeeId: z.string().uuid(),
  amount: z.coerce.number().positive(),
  installmentAmount: z.coerce.number().positive(),
  reason: z.string().min(3),
  grantedAt: z.coerce.date()
});

router.get(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const employeeId = req.query.employeeId ? z.string().uuid().parse(req.query.employeeId) : undefined;
    const status = req.query.status ? z.enum(["OPEN", "SETTLED"]).parse(String(req.query.status).toUpperCase()) : undefined;
    const advances = await prisma.cashAdvance.findMany({
      where: {
        employeeId,
        status
      },
      include: {
        employee: {
          select: { firstName: true, lastName: true, employeeCode: true }
        }
      },
      orderBy: [{ status: "asc" }, { grantedAt: "desc" }]
    });
    res.json(advances);
  })
);

router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const payload = createCashAdvanceSchema.parse(req.body);
    const employee = await prisma.employee.findUnique({ where: { id: payload.employeeId } });
    if (!employee) throw new HttpError(404, "Employee not found");

    const advance = await prisma.cashAdvance.create({
      data: {
        employeeId: payload.employeeId,
        amount: payload.amount,
        balance: payload.amount,
        installmentAmount: payload.installmentAmount,
        reason: payload.reason,
        grantedAt: payload.grantedAt
      }
    });

    res.status(201).json(advance);
  })
);

export default router;
