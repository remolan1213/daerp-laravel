-- CreateEnum
CREATE TYPE "CashAdvanceStatus" AS ENUM ('OPEN', 'SETTLED');

-- AlterTable
ALTER TABLE "Payroll"
ADD COLUMN "cashAdvanceDeduction" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "governmentRateTableId" TEXT;

-- CreateTable
CREATE TABLE "CashAdvance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL,
    "installmentAmount" DECIMAL(12,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "CashAdvanceStatus" NOT NULL DEFAULT 'OPEN',
    "grantedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CashAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollCashAdvance" (
    "id" TEXT NOT NULL,
    "payrollId" TEXT NOT NULL,
    "cashAdvanceId" TEXT NOT NULL,
    "amountApplied" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PayrollCashAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovernmentRateTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL,
    "effectiveTo" TIMESTAMP(3),
    "sssEmployeeRate" DECIMAL(6,4) NOT NULL,
    "sssEmployerRate" DECIMAL(6,4) NOT NULL,
    "sssMaxContributionBase" DECIMAL(12,2) NOT NULL,
    "philhealthRate" DECIMAL(6,4) NOT NULL,
    "philhealthMinBase" DECIMAL(12,2) NOT NULL,
    "philhealthMaxBase" DECIMAL(12,2) NOT NULL,
    "pagibigEmployeeRate" DECIMAL(6,4) NOT NULL,
    "pagibigEmployerRate" DECIMAL(6,4) NOT NULL,
    "pagibigMaxContribution" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GovernmentRateTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WithholdingTaxBracket" (
    "id" TEXT NOT NULL,
    "governmentRateTableId" TEXT NOT NULL,
    "minMonthlyCompensation" DECIMAL(12,2) NOT NULL,
    "maxMonthlyCompensation" DECIMAL(12,2),
    "baseTax" DECIMAL(12,2) NOT NULL,
    "marginalRate" DECIMAL(6,4) NOT NULL,
    "orderNo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WithholdingTaxBracket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSetting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT 'night-ops',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Payroll_employeeId_idx" ON "Payroll"("employeeId");

-- CreateIndex
CREATE INDEX "Payroll_periodId_idx" ON "Payroll"("periodId");

-- CreateIndex
CREATE INDEX "PayrollCashAdvance_payrollId_idx" ON "PayrollCashAdvance"("payrollId");

-- CreateIndex
CREATE INDEX "PayrollCashAdvance_cashAdvanceId_idx" ON "PayrollCashAdvance"("cashAdvanceId");

-- CreateIndex
CREATE INDEX "WithholdingTaxBracket_governmentRateTableId_idx" ON "WithholdingTaxBracket"("governmentRateTableId");

-- CreateIndex
CREATE UNIQUE INDEX "WithholdingTaxBracket_governmentRateTableId_orderNo_key"
ON "WithholdingTaxBracket"("governmentRateTableId", "orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_userId_key" ON "UserSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payroll_employeeId_periodId_key" ON "Payroll"("employeeId", "periodId");

-- AddForeignKey
ALTER TABLE "Payroll"
ADD CONSTRAINT "Payroll_governmentRateTableId_fkey"
FOREIGN KEY ("governmentRateTableId") REFERENCES "GovernmentRateTable"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashAdvance"
ADD CONSTRAINT "CashAdvance_employeeId_fkey"
FOREIGN KEY ("employeeId") REFERENCES "Employee"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollCashAdvance"
ADD CONSTRAINT "PayrollCashAdvance_payrollId_fkey"
FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollCashAdvance"
ADD CONSTRAINT "PayrollCashAdvance_cashAdvanceId_fkey"
FOREIGN KEY ("cashAdvanceId") REFERENCES "CashAdvance"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WithholdingTaxBracket"
ADD CONSTRAINT "WithholdingTaxBracket_governmentRateTableId_fkey"
FOREIGN KEY ("governmentRateTableId") REFERENCES "GovernmentRateTable"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSetting"
ADD CONSTRAINT "UserSetting_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
