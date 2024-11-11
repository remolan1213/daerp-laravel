// PayrollController.js
const Payroll = require('../entity/Payroll');
const Worker = require('../entity/Worker');

const createPayroll = async (req, res, AppDataSource) => {
  const { payrollPeriod, payrollDate, grossAmount, netAmount, deductions, deductionAmount, totalAmount, workerId } = req.body;

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
      grossAmount,
      netAmount,
      deductions,
      deductionAmount,
      totalAmount,
      worker,
    });

    const newPayroll = await payrollRepository.save(payroll);
    res.status(201).json(newPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating payroll', error });
  }
};

const getPayrolls = async (req, res, AppDataSource) => {
  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payrolls = await payrollRepository.find({ relations: ["worker"] });
    res.status(200).json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payrolls', error });
  }
};

const getPayrollById = async (req, res, AppDataSource) => {
  const { id } = req.params;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id }, relations: ["worker"] });

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    res.status(200).json(payroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payroll', error });
  }
};

const updatePayroll = async (req, res, AppDataSource) => {
  const { id } = req.params;
  const { payrollPeriod, payrollDate, grossAmount, netAmount, deductions, deductionAmount, totalAmount, workerId } = req.body;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const workerRepository = AppDataSource.getRepository(Worker);

    const payroll = await payrollRepository.findOne({ where: { id } });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    const worker = await workerRepository.findOne({ where: { id: workerId } });
    if (workerId && !worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    payroll.payrollPeriod = payrollPeriod || payroll.payrollPeriod;
    payroll.payrollDate = payrollDate || payroll.payrollDate;
    payroll.grossAmount = grossAmount || payroll.grossAmount;
    payroll.netAmount = netAmount || payroll.netAmount;
    payroll.deductions = deductions || payroll.deductions;
    payroll.deductionAmount = deductionAmount || payroll.deductionAmount;
    payroll.totalAmount = totalAmount || payroll.totalAmount;
    if (workerId) payroll.worker = worker;

    const updatedPayroll = await payrollRepository.save(payroll);
    res.status(200).json(updatedPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating payroll', error });
  }
};

const deletePayroll = async (req, res, AppDataSource) => {
  const { id } = req.params;

  try {
    const payrollRepository = AppDataSource.getRepository(Payroll);
    const payroll = await payrollRepository.findOne({ where: { id } });

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

module.exports = {
  createPayroll,
  getPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
