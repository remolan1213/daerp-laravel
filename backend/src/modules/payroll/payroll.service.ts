import { prisma } from "../../core/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { HttpError, roundCurrency, toNumber } from "../../core/http";

type DecimalLike = number | string | Decimal;

const HOLIDAY_PREMIUM_MULTIPLIER: Record<string, number> = {
  REGULAR: 2,
  SPECIAL: 1.3
};

function decimalToNumber(value: DecimalLike | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return toNumber(value);
}

function computeMonthlyTaxFromBrackets(
  taxablePay: number,
  brackets: Array<{
    minMonthlyCompensation: DecimalLike;
    maxMonthlyCompensation: DecimalLike | null;
    baseTax: DecimalLike;
    marginalRate: DecimalLike;
  }>
): number {
  for (const bracket of brackets) {
    const min = decimalToNumber(bracket.minMonthlyCompensation);
    const max = bracket.maxMonthlyCompensation === null ? Number.POSITIVE_INFINITY : decimalToNumber(bracket.maxMonthlyCompensation);

    if (taxablePay >= min && taxablePay <= max) {
      const baseTax = decimalToNumber(bracket.baseTax);
      const marginalRate = decimalToNumber(bracket.marginalRate);
      return roundCurrency(baseTax + (taxablePay - min) * marginalRate);
    }
  }

  return 0;
}

export class PayrollService {
  async runPayroll(employeeId: string, periodId: string) {
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) throw new HttpError(404, "Employee not found");

    const period = await prisma.payrollPeriod.findUnique({ where: { id: periodId } });
    if (!period) throw new HttpError(404, "Payroll period not found");

    if (period.isFinalized) {
      throw new HttpError(409, "Cannot run payroll for finalized period");
    }

    const existing = await prisma.payroll.findFirst({
      where: { employeeId, periodId }
    });
    if (existing) {
      throw new HttpError(409, "Payroll already generated for this employee and period");
    }

    const governmentRateTable = await prisma.governmentRateTable.findFirst({
      where: {
        effectiveFrom: { lte: period.endDate },
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: period.endDate } }]
      },
      include: {
        taxBrackets: {
          orderBy: { orderNo: "asc" }
        }
      },
      orderBy: {
        effectiveFrom: "desc"
      }
    });

    if (!governmentRateTable) {
      throw new HttpError(400, "No government rate table configured for this payroll period");
    }

    const attendances = await prisma.attendanceRecord.findMany({
      where: {
        employeeId,
        date: {
          gte: period.startDate,
          lte: period.endDate
        }
      }
    });

    if (!attendances.length) {
      throw new HttpError(400, "No attendance records found for selected period");
    }

    const basicSalary = toNumber(employee.basicSalary);
    const dailyRate = basicSalary / 22;

    let basicPay = 0;
    let overtimePay = 0;
    let nightDiffPay = 0;
    let holidayPay = 0;

    attendances.forEach((attendance) => {
      const hoursWorked = toNumber(attendance.hoursWorked);
      const overtimeHours = toNumber(attendance.overtimeHours);
      const nightHours = toNumber(attendance.nightHours);
      const hourlyRate = dailyRate / 8;

      basicPay += dailyRate;
      overtimePay += hourlyRate * 1.25 * overtimeHours;
      nightDiffPay += hourlyRate * 0.1 * nightHours;

      if (attendance.holidayType) {
        const holidayType = attendance.holidayType.toUpperCase();
        const multiplier = HOLIDAY_PREMIUM_MULTIPLIER[holidayType] ?? 1;
        holidayPay += hourlyRate * hoursWorked * Math.max(multiplier - 1, 0);
      }
    });

    basicPay = roundCurrency(basicPay);
    overtimePay = roundCurrency(overtimePay);
    nightDiffPay = roundCurrency(nightDiffPay);
    holidayPay = roundCurrency(holidayPay);

    const grossPay = roundCurrency(basicPay + overtimePay + nightDiffPay + holidayPay);

    const sssBase = Math.min(grossPay, decimalToNumber(governmentRateTable.sssMaxContributionBase));
    const sssEmployee = roundCurrency(sssBase * decimalToNumber(governmentRateTable.sssEmployeeRate));
    const sssEmployer = roundCurrency(sssBase * decimalToNumber(governmentRateTable.sssEmployerRate));

    const philhealthBase = Math.max(
      decimalToNumber(governmentRateTable.philhealthMinBase),
      Math.min(grossPay, decimalToNumber(governmentRateTable.philhealthMaxBase))
    );
    const philhealthTotal = roundCurrency(philhealthBase * decimalToNumber(governmentRateTable.philhealthRate));
    const philhealthEmployee = roundCurrency(philhealthTotal / 2);
    const philhealthEmployer = roundCurrency(philhealthTotal / 2);

    const pagibigBase = Math.min(grossPay, decimalToNumber(governmentRateTable.pagibigMaxContribution));
    const pagibigEmployee = roundCurrency(pagibigBase * decimalToNumber(governmentRateTable.pagibigEmployeeRate));
    const pagibigEmployer = roundCurrency(pagibigBase * decimalToNumber(governmentRateTable.pagibigEmployerRate));

    const taxablePay = roundCurrency(
      grossPay - sssEmployee - philhealthEmployee - pagibigEmployee
    );

    const monthlyTax = computeMonthlyTaxFromBrackets(Math.max(taxablePay, 0), governmentRateTable.taxBrackets);
    const isSemiMonthly = period.cutoffType.toLowerCase().includes("semi");
    const withholdingTax = roundCurrency(isSemiMonthly ? monthlyTax / 2 : monthlyTax);

    const openCashAdvances = await prisma.cashAdvance.findMany({
      where: {
        employeeId,
        status: "OPEN",
        balance: { gt: 0 }
      },
      orderBy: [{ grantedAt: "asc" }, { createdAt: "asc" }]
    });

    const cashAdvanceApplications: Array<{ cashAdvanceId: string; amountApplied: number; newBalance: number }> = [];
    let cashAdvanceDeduction = 0;
    for (const advance of openCashAdvances) {
      const balance = decimalToNumber(advance.balance);
      if (balance <= 0) continue;
      const installment = Math.max(0, decimalToNumber(advance.installmentAmount));
      const amountApplied = roundCurrency(Math.min(balance, installment));
      if (amountApplied <= 0) continue;
      cashAdvanceDeduction += amountApplied;
      cashAdvanceApplications.push({
        cashAdvanceId: advance.id,
        amountApplied,
        newBalance: roundCurrency(balance - amountApplied)
      });
    }
    cashAdvanceDeduction = roundCurrency(cashAdvanceDeduction);

    const totalDeductions = roundCurrency(
      sssEmployee +
        philhealthEmployee +
        pagibigEmployee +
        withholdingTax +
        cashAdvanceDeduction
    );
    const netPay = roundCurrency(grossPay - totalDeductions);

    const ytdAggregate = await prisma.payroll.aggregate({
      _sum: {
        grossPay: true,
        withholdingTax: true
      },
      where: {
        employeeId,
        period: {
          year: period.year
        }
      }
    });

    const ytdGross = roundCurrency(toNumber(ytdAggregate._sum.grossPay) + grossPay);
    const ytdTax = roundCurrency(toNumber(ytdAggregate._sum.withholdingTax) + withholdingTax);

    return prisma.$transaction(async (tx) => {
      const payroll = await tx.payroll.create({
        data: {
          employeeId,
          periodId,
          governmentRateTableId: governmentRateTable.id,
          basicPay: new Decimal(basicPay),
          overtimePay: new Decimal(overtimePay),
          holidayPay: new Decimal(holidayPay),
          nightDiffPay: new Decimal(nightDiffPay),
          grossPay: new Decimal(grossPay),
          sssEmployee: new Decimal(sssEmployee),
          sssEmployer: new Decimal(sssEmployer),
          philhealthEmployee: new Decimal(philhealthEmployee),
          philhealthEmployer: new Decimal(philhealthEmployer),
          pagibigEmployee: new Decimal(pagibigEmployee),
          pagibigEmployer: new Decimal(pagibigEmployer),
          withholdingTax: new Decimal(withholdingTax),
          cashAdvanceDeduction: new Decimal(cashAdvanceDeduction),
          totalDeductions: new Decimal(totalDeductions),
          netPay: new Decimal(netPay),
          ytdGross: new Decimal(ytdGross),
          ytdTax: new Decimal(ytdTax)
        }
      });

      for (const application of cashAdvanceApplications) {
        await tx.payrollCashAdvance.create({
          data: {
            payrollId: payroll.id,
            cashAdvanceId: application.cashAdvanceId,
            amountApplied: new Decimal(application.amountApplied)
          }
        });

        await tx.cashAdvance.update({
          where: { id: application.cashAdvanceId },
          data: {
            balance: new Decimal(application.newBalance),
            status: application.newBalance <= 0 ? "SETTLED" : "OPEN"
          }
        });
      }

      return payroll;
    });
  }
}
