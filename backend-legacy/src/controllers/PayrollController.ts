import { Request, Response } from "express";
import AppDataSource from "../data-source";
import Payroll from "../entities/Payroll";
import Worker from "../entities/Worker";
import { sendError, sendPaginated } from "../utils/http";

const parseNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const hasInvalidNumber = (value: unknown) => {
  if (value === undefined || value === null || value === "") return false;
  return !Number.isFinite(Number(value));
};

const buildSummary = (payroll: Payroll) => {
  const worker = payroll.worker;
  const name = worker
    ? [worker.firstName, worker.middleName, worker.lastName].filter(Boolean).join(" ")
    : "";
  return {
    name,
    bankAccount: worker?.bankAccount ?? "",
    department: worker?.department ?? "",
    idNumber: worker?.idNumber ?? "",
    payrollPeriod: payroll.payrollPeriod,
    payrollDate: payroll.payrollDate,
    client: payroll.client ?? "",
    client2: payroll.client2 ?? "",
    grossAmount: payroll.grossAmount ?? 0,
    grossAmount2: payroll.grossAmount2 ?? 0,
    netAmount: payroll.netAmount ?? 0,
    netAmount2: payroll.netAmount2 ?? 0,
    deductions: payroll.deductions ?? "",
    deductionAmount: payroll.deductionAmount ?? 0,
    totalAmount: payroll.totalAmount ?? 0,
    rate: payroll.rate ?? 0,
  };
};

// **FUNCTION: CREATE PAYROLL**
export const createPayroll = async (req: Request, res: Response) => {
  const {
    payrollPeriod,
    payrollDate,
    grossAmount,
    grossAmount2,
    netAmount,
    netAmount2,
    deductions,
    deductionAmount,
    totalAmount,
    rate,
    client,
    client2,
    workerId,
  } = req.body;

  try {
    if (!payrollPeriod || !payrollDate) {
      return sendError(res, 400, "VALIDATION_ERROR", "Missing payrollPeriod or payrollDate");
    }
    const numericFields = [
      grossAmount,
      grossAmount2,
      netAmount,
      netAmount2,
      deductionAmount,
      totalAmount,
      rate,
    ];
    if (numericFields.some(hasInvalidNumber)) {
      return sendError(res, 400, "VALIDATION_ERROR", "Invalid numeric value in payload");
    }

    const payrollRepository = AppDataSource.getRepository(Payroll);
    const workerRepository = AppDataSource.getRepository(Worker);

    const payroll = new Payroll();
    payroll.payrollPeriod = payrollPeriod;
    payroll.payrollDate = payrollDate;
    payroll.grossAmount = parseNumber(grossAmount);
    payroll.grossAmount2 = parseNumber(grossAmount2);
    payroll.netAmount = parseNumber(netAmount, parseNumber(grossAmount) * parseNumber(rate, 0));
    payroll.netAmount2 = parseNumber(netAmount2, parseNumber(grossAmount2) * parseNumber(rate, 0));
    payroll.deductions = deductions ?? "";
    payroll.deductionAmount = parseNumber(deductionAmount);
    payroll.rate = parseNumber(rate);
    payroll.totalAmount =
      parseNumber(totalAmount) ||
      payroll.netAmount + payroll.netAmount2 - payroll.deductionAmount;
    payroll.client = client ?? "";
    payroll.client2 = client2 ?? "";

    if (workerId) {
      const worker = await workerRepository.findOne({
        where: { id: Number(workerId) },
      });
      if (!worker) {
        return sendError(res, 404, "WORKER_NOT_FOUND", "Worker not found");
      }
      payroll.worker = worker;
    }

    const newPayroll = await payrollRepository.save(payroll);
    return res.status(201).json(newPayroll);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_CREATE_FAILED", "Error creating payroll", error);
  }
};

// **FUNCTION: GET PAYROLLS**
export const getPayrolls = async (req: Request, res: Response) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const workerId = req.query.workerId ? Number(req.query.workerId) : undefined;

    const [payrolls, total] = await payrollRepository.findAndCount({
      relations: ["worker"],
      where: workerId ? { worker: { id: workerId } } : undefined,
      order: { id: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return sendPaginated(res, payrolls, page, limit, total);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_FETCH_FAILED", "Error fetching payrolls", error);
  }
};

// **FUNCTION: GET PAYROLL BY ID**
export const getPayrollById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({
      where: { id: Number(id) },
      relations: ["worker"],
    });
    if (!payroll) {
      return sendError(res, 404, "PAYROLL_NOT_FOUND", "Payroll not found");
    }
    return res.status(200).json(payroll);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_FETCH_FAILED", "Error fetching payroll", error);
  }
};

// **FUNCTION: UPDATE PAYROLL**
export const updatePayroll = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    payrollPeriod,
    payrollDate,
    grossAmount,
    grossAmount2,
    netAmount,
    netAmount2,
    deductions,
    deductionAmount,
    totalAmount,
    rate,
    client,
    client2,
    workerId,
  } = req.body;

  try {
    const numericFields = [
      grossAmount,
      grossAmount2,
      netAmount,
      netAmount2,
      deductionAmount,
      totalAmount,
      rate,
    ];
    if (numericFields.some(hasInvalidNumber)) {
      return sendError(res, 400, "VALIDATION_ERROR", "Invalid numeric value in payload");
    }

    const payrollRepository = AppDataSource.getRepository(Payroll);
    const workerRepository = AppDataSource.getRepository(Worker);
    const payroll = await payrollRepository.findOne({ where: { id: Number(id) } });
    if (!payroll) {
      return sendError(res, 404, "PAYROLL_NOT_FOUND", "Payroll not found");
    }

    payroll.payrollPeriod = payrollPeriod ?? payroll.payrollPeriod;
    payroll.payrollDate = payrollDate ?? payroll.payrollDate;
    payroll.grossAmount = parseNumber(grossAmount, payroll.grossAmount);
    payroll.grossAmount2 = parseNumber(grossAmount2, payroll.grossAmount2);
    payroll.netAmount = parseNumber(netAmount, payroll.netAmount);
    payroll.netAmount2 = parseNumber(netAmount2, payroll.netAmount2);
    payroll.deductions = deductions ?? payroll.deductions;
    payroll.deductionAmount = parseNumber(deductionAmount, payroll.deductionAmount);
    payroll.rate = parseNumber(rate, payroll.rate);
    payroll.totalAmount =
      parseNumber(totalAmount) ||
      payroll.netAmount + payroll.netAmount2 - payroll.deductionAmount;
    payroll.client = client ?? payroll.client;
    payroll.client2 = client2 ?? payroll.client2;

    if (workerId) {
      const worker = await workerRepository.findOne({
        where: { id: Number(workerId) },
      });
      if (!worker) {
        return sendError(res, 404, "WORKER_NOT_FOUND", "Worker not found");
      }
      payroll.worker = worker;
    }

    const updatedPayroll = await payrollRepository.save(payroll);
    return res.status(200).json(updatedPayroll);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_UPDATE_FAILED", "Error updating payroll", error);
  }
};

// **FUNCTION: DELETE PAYROLL**
export const deletePayroll = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id: Number(id) } });
    if (!payroll) {
      return sendError(res, 404, "PAYROLL_NOT_FOUND", "Payroll not found");
    }

    await payrollRepository.remove(payroll);
    return res.status(200).json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_DELETE_FAILED", "Error deleting payroll", error);
  }
};

// **FUNCTION: GET PAYROLL TOTALS SUMMARY**
export const getPayrollTotals = async (req: Request, res: Response) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payrolls = await payrollRepository.find();

    const totals = payrolls.reduce(
      (acc, payroll) => {
        acc.count += 1;
        acc.grossAmount += payroll.grossAmount ?? 0;
        acc.netAmount += payroll.netAmount ?? 0;
        acc.totalAmount += payroll.totalAmount ?? 0;
        return acc;
      },
      { count: 0, grossAmount: 0, netAmount: 0, totalAmount: 0 }
    );

    return res.json(totals);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_FETCH_FAILED", "Error fetching payroll totals", error);
  }
};

// **FUNCTION: GET PAYROLL SUMMARY FOR UI**
export const getPayrollSummary = async (req: Request, res: Response) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({
      relations: ["worker"],
      order: { id: "DESC" },
    });
    if (!payroll) {
      return sendError(res, 404, "PAYROLL_NOT_FOUND", "No payroll data found");
    }
    return res.status(200).json(buildSummary(payroll));
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "PAYROLL_FETCH_FAILED", "Error fetching payroll summary", error);
  }
};
