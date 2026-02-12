"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const prisma_1 = require("../../core/prisma");
const library_1 = require("@prisma/client/runtime/library");
class PayrollService {
    async runPayroll(employeeId, periodId) {
        const employee = await prisma_1.prisma.employee.findUnique({ where: { id: employeeId } });
        if (!employee)
            throw new Error("Employee not found");
        const attendances = await prisma_1.prisma.attendanceRecord.findMany({
            where: { employeeId }
        });
        const dailyRate = new library_1.Decimal(employee.basicSalary).div(22);
        let basicPay = new library_1.Decimal(0);
        let overtimePay = new library_1.Decimal(0);
        let nightDiffPay = new library_1.Decimal(0);
        attendances.forEach(a => {
            basicPay = basicPay.add(dailyRate);
            const hourly = dailyRate.div(8);
            overtimePay = overtimePay.add(hourly.mul(1.25).mul(a.overtimeHours));
            nightDiffPay = nightDiffPay.add(hourly.mul(0.1).mul(a.nightHours));
        });
        const grossPay = basicPay.add(overtimePay).add(nightDiffPay);
        const withholdingTax = grossPay.mul(0.1);
        const netPay = grossPay.sub(withholdingTax);
        return prisma_1.prisma.payroll.create({
            data: {
                employeeId,
                periodId,
                basicPay,
                overtimePay,
                holidayPay: new library_1.Decimal(0),
                nightDiffPay,
                grossPay,
                sssEmployee: new library_1.Decimal(0),
                sssEmployer: new library_1.Decimal(0),
                philhealthEmployee: new library_1.Decimal(0),
                philhealthEmployer: new library_1.Decimal(0),
                pagibigEmployee: new library_1.Decimal(0),
                pagibigEmployer: new library_1.Decimal(0),
                withholdingTax,
                totalDeductions: withholdingTax,
                netPay,
                ytdGross: grossPay,
                ytdTax: withholdingTax
            }
        });
    }
}
exports.PayrollService = PayrollService;
