import AppDataSource from '../data-source.js';
import Payroll from '../entities/Payroll.js';
import Worker from '../entities/Worker.js';

const createPayroll = async (req, res) => {
  const { payrollPeriod, payrollDate, workerId } = req.body;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const workerRepository = AppDataSource.getRepository(Worker);

    const worker = await workerRepository.findOne({ where: { id: workerId } });
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    const payroll = payrollRepository.create({
      payrollPeriod,
      payrollDate,
      worker,
    });

    const newPayroll = await payrollRepository.save(payroll);
    res.status(201).json(newPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payroll', error });
  }
};

const getPayrolls = async (req, res) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payrolls = await payrollRepository.find({ relations: ['worker'] });
    res.status(200).json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payrolls', error });
  }
};

const getPayrollById = async (req, res) => {
  const { id } = req.params;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id }, relations: ['worker'] });

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    res.status(200).json(payroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payroll', error });
  }
};

const updatePayroll = async (req, res) => {
  const { id } = req.params;
  const { payrollPeriod, payrollDate } = req.body;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);

    const payroll = await payrollRepository.findOne({ where: { id } });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    payroll.payrollPeriod = payrollPeriod || payroll.payrollPeriod;
    payroll.payrollDate = payrollDate || payroll.payrollDate;

    await payrollRepository.save(payroll);
    res.status(200).json({ message: 'Payroll updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating payroll', error });
  }
};

const deletePayroll = async (req, res) => {
  const { id } = req.params;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);

    const result = await payrollRepository.delete({ id });
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    res.status(200).json({ message: 'Payroll deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting payroll', error });
  }
};

export default {
  createPayroll,
  getPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
