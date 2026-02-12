import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../core/prisma";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";

const router = Router();

const createEmployeeSchema = z.object({
  employeeCode: z.string().min(2).max(20),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employmentType: z.string().min(1),
  salaryType: z.string().min(1),
  basicSalary: z.coerce.number().positive(),
  tin: z.string().optional().nullable(),
  sssNumber: z.string().optional().nullable(),
  philhealthNumber: z.string().optional().nullable(),
  pagibigNumber: z.string().optional().nullable(),
  dateHired: z.coerce.date(),
  isActive: z.boolean().optional()
});

router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const payload = createEmployeeSchema.parse(req.body);
    const employee = await prisma.employee.create({ data: payload });
    res.status(201).json(employee);
  })
);

router.get(
  "/",
  authenticate,
  asyncHandler(async (_req, res) => {
    const employees = await prisma.employee.findMany({ orderBy: { createdAt: "desc" } });
    res.json(employees);
  })
);

export default router;
