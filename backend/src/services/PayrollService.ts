// PayrollService.ts
import {entitiesRepository, Repository } from 'typeorm';
import  Payroll from '../entities/Payroll';
import PayrollData  from '../entities/PayrollData';
import  Worker  from '../entities/Worker';

const createPayroll = async (payrollData: any, AppDataSource: any) => {
  const {
    payrollPeriod, payrollDate, grossAmount, netAmount,
    deductions, deductionAmount, totalAmount, workerId, payrollDetails
  } = payrollData;

  const payrollRepository = AppDataSource.getRepository(Payroll);
  const workerRepository = AppDataSource.getRepository(Worker);
  const payrollDataRepository = AppDataSource.getRepository(PayrollData);

  const worker = await workerRepository.findOne({ where: { id: workerId } });
  if (!worker) throw new Error('Worker not found');

  const payroll = payrollRepository.create({
    payrollPeriod, payrollDate, grossAmount, netAmount,
    deductions, deductionAmount, totalAmount, worker
  });

  const savedPayroll = await payrollRepository.save(payroll);

  if (payrollDetails && Array.isArray(payrollDetails)) {
    const payrollDataEntries = payrollDetails.map(detail => 
      payrollDataRepository.create({ ...detail, payroll: savedPayroll })
    );
    await payrollDataRepository.save(payrollDataEntries);
  }

  return savedPayroll;
};

const getAllPayrolls = async (AppDataSource: any) => {
  const payrollRepository = AppDataSource.getRepository(Payroll);
  return payrollRepository.find({ relations: ["worker", "payrollData"] });
};

const getPayrollById = async (id: number, AppDataSource: any) => {
  const payrollRepository = AppDataSource.getRepository(Payroll);
  return payrollRepository.findOne({ where: { id }, relations: ["worker", "payrollData"] });
};

const updatePayroll = async (id: number, payrollData: any, AppDataSource: any) => {
  const { payrollPeriod, payrollDate, grossAmount, netAmount, deductions, deductionAmount, totalAmount, workerId } = payrollData;
  const payrollRepository = AppDataSource.getRepository(Payroll);
  const workerRepository = AppDataSource.getRepository(Worker);

  const payroll = await payrollRepository.findOne({ where: { id } });
  if (!payroll) return null;

  if (workerId) {
    const worker = await workerRepository.findOne({ where: { id: workerId } });
    if (!worker) throw new Error('Worker not found');
    payroll.worker = worker;
  }

  Object.assign(payroll, {
    payrollPeriod: payrollPeriod || payroll.payrollPeriod,
    payrollDate: payrollDate || payroll.payrollDate,
    grossAmount: grossAmount || payroll.grossAmount,
    netAmount: netAmount || payroll.netAmount,
    deductions: deductions || payroll.deductions,
    deductionAmount: deductionAmount || payroll.deductionAmount,
    totalAmount: totalAmount || payroll.totalAmount,
  });

  return payrollRepository.save(payroll);
};

const deletePayroll = async (id: number, AppDataSource: any) => {
  const payrollRepository = AppDataSource.getRepository(Payroll);
  const payroll = await payrollRepository.findOne({ where: { id } });
  if (!payroll) return null;
  await payrollRepository.remove(payroll);
  return payroll;
};

export {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
