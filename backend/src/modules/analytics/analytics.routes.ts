import { Router } from "express";
import { authenticate } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";
import { prisma } from "../../core/prisma";
import { toNumber } from "../../core/http";

const router = Router();

router.get(
  "/summary",
  authenticate,
  asyncHandler(async (req, res) => {
    const yearQuery = Number(req.query.year);
    const targetYear = Number.isFinite(yearQuery) ? yearQuery : undefined;

    const [usersCount, employeesCount, periodsCount, attendanceCount] = await Promise.all([
      prisma.user.count(),
      prisma.employee.count(),
      prisma.payrollPeriod.count({ where: targetYear ? { year: targetYear } : undefined }),
      prisma.attendanceRecord.count()
    ]);

    const payrollWhere = targetYear
      ? {
          period: {
            year: targetYear
          }
        }
      : undefined;

    const payrollAggregate = await prisma.payroll.aggregate({
      _count: { id: true },
      _sum: {
        grossPay: true,
        netPay: true,
        totalDeductions: true,
        sssEmployee: true,
        sssEmployer: true,
        philhealthEmployee: true,
        philhealthEmployer: true,
        pagibigEmployee: true,
        pagibigEmployer: true,
        withholdingTax: true
      },
      where: payrollWhere
    });

    const recentPayroll = await prisma.payroll.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            employeeCode: true
          }
        },
        period: {
          select: {
            startDate: true,
            endDate: true,
            cutoffType: true,
            year: true
          }
        }
      },
      where: payrollWhere
    });

    res.json({
      usersCount,
      employeesCount,
      periodsCount,
      attendanceCount,
      payrollCount: payrollAggregate._count.id ?? 0,
      totals: {
        grossPay: toNumber(payrollAggregate._sum.grossPay),
        netPay: toNumber(payrollAggregate._sum.netPay),
        totalDeductions: toNumber(payrollAggregate._sum.totalDeductions),
        withholdingTax: toNumber(payrollAggregate._sum.withholdingTax)
      },
      statutory: {
        sssEmployee: toNumber(payrollAggregate._sum.sssEmployee),
        sssEmployer: toNumber(payrollAggregate._sum.sssEmployer),
        philhealthEmployee: toNumber(payrollAggregate._sum.philhealthEmployee),
        philhealthEmployer: toNumber(payrollAggregate._sum.philhealthEmployer),
        pagibigEmployee: toNumber(payrollAggregate._sum.pagibigEmployee),
        pagibigEmployer: toNumber(payrollAggregate._sum.pagibigEmployer)
      },
      recentPayroll
    });
  })
);

export default router;
