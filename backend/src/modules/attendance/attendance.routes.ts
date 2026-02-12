import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../core/prisma";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";
import { HttpError } from "../../core/http";

const router = Router();

const createAttendanceSchema = z.object({
  employeeId: z.string().uuid(),
  date: z.coerce.date(),
  hoursWorked: z.coerce.number().min(0).max(24),
  overtimeHours: z.coerce.number().min(0).max(24).default(0),
  nightHours: z.coerce.number().min(0).max(24).default(0),
  isRestDay: z.boolean().default(false),
  holidayType: z.string().optional().nullable()
});

router.post(
  "/",
  authenticate,
  asyncHandler(async (req, res) => {
    const payload = createAttendanceSchema.parse(req.body);
    const employee = await prisma.employee.findUnique({ where: { id: payload.employeeId } });
    if (!employee) throw new HttpError(404, "Employee not found");

    const record = await prisma.attendanceRecord.create({ data: payload });
    res.status(201).json(record);
  })
);

router.get(
  "/:employeeId",
  authenticate,
  asyncHandler(async (req, res) => {
    const employeeId = z.string().uuid().parse(req.params.employeeId);
    const records = await prisma.attendanceRecord.findMany({
      where: { employeeId },
      orderBy: { date: "desc" }
    });

    res.json(records);
  })
);

export default router;
