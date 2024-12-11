import { Request, Response } from 'express';
import AppDataSource from '../data-source';
import Payroll from '../entities/Payroll';
import Worker from '../entities/Worker';

// **FUNCTION: CREATE PAYROLL**
export const createPayroll = async (req: Request, res: Response) => {
  const { payrollPeriod, payrollDate }: { payrollPeriod: string; payrollDate: Date } = req.body;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);

    const payroll = new Payroll();
    payroll.payrollPeriod = payrollPeriod;
    payroll.payrollDate = payrollDate;

    const newPayroll = await payrollRepository.save(payroll);
    res.status(201).json(newPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payroll', error });
  }
};

// **FUNCTION: GET PAYROLLS**
export const getPayrolls = async (req: Request, res: Response) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payrolls = await payrollRepository.find({ relations: ['worker'] });
    res.status(200).json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payrolls', error });
  }
};

// **FUNCTION: GET PAYROLL BY ID**
export const getPayrollById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id: Number(id) }, relations: ['worker'] });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    res.status(200).json(payroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payroll', error });
  }
};

// **FUNCTION: UPDATE PAYROLL**
export const updatePayroll = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { payrollPeriod, payrollDate }: { payrollPeriod: string; payrollDate: Date } = req.body;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id: Number(id) } });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    payroll.payrollPeriod = payrollPeriod;
    payroll.payrollDate = payrollDate;

    const updatedPayroll = await payrollRepository.save(payroll);
    res.status(200).json(updatedPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating payroll', error });
  }
};

// **FUNCTION: DELETE PAYROLL**
export const deletePayroll = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id: Number(id) } });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    await payrollRepository.remove(payroll);
    res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting payroll', error });
  }
};