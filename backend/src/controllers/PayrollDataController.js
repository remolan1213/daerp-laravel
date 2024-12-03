import AppDataSource from '../data-source.js';
import PayrollData from '../entities/PayrollData.js';

const getAllPayrollData = async (req, res) => {
  try {
    const payrollData = await AppDataSource.getRepository(PayrollData).find();
    res.json(payrollData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPayrollData = async (req, res) => {
  try {
    const payrollData = await AppDataSource.getRepository(PayrollData).save(req.body);
    res.status(201).json(payrollData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPayrollDataById = async (req, res) => {
  try {
    const payrollData = await AppDataSource.getRepository(PayrollData).findOne(req.params.id);
    if (!payrollData) {
      return res.status(404).json({ error: 'Payroll Data not found' });
    }
    res.json(payrollData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePayrollData = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(PayrollData).update(req.params.id, req.body);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Payroll Data not found' });
    }
    res.json({ message: 'Payroll Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePayrollData = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(PayrollData).delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Payroll Data not found' });
    }
    res.json({ message: 'Payroll Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getAllPayrollData,
  createPayrollData,
  getPayrollDataById,
  updatePayrollData,
  deletePayrollData,
};
