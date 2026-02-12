import AppDataSource from '../data-source.js';
import PayrollData from '../entities/PayrollData.js';
// **FUNCTION: GET ALL PAYROLL DATA**
export const getAllPayrollData = async (req, res) => {
    try {
        const payrollData = await AppDataSource.getRepository(PayrollData).find();
        res.json(payrollData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: CREATE PAYROLL DATA**
export const createPayrollData = async (req, res) => {
    try {
        const payrollData = await AppDataSource.getRepository(PayrollData).save(req.body);
        res.status(201).json(payrollData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: GET PAYROLL DATA BY ID**
export const getPayrollDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const payrollData = await AppDataSource.getRepository(PayrollData).findOne({ where: { id: Number(id) } });
        if (!payrollData) {
            return res.status(404).json({ error: 'Payroll Data not found' });
        }
        res.json(payrollData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: UPDATE PAYROLL DATA**
export const updatePayrollData = async (req, res) => {
    const { id } = req.params;
    try {
        const payrollDataRepository = AppDataSource.getRepository(PayrollData);
        const payrollData = await payrollDataRepository.findOne({ where: { id: Number(id) } });
        if (!payrollData) {
            return res.status(404).json({ error: 'Payroll Data not found' });
        }
        await payrollDataRepository.update(id, req.body);
        const updatedPayrollData = await payrollDataRepository.findOne({ where: { id: Number(id) } });
        res.json(updatedPayrollData);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: DELETE PAYROLL DATA**
export const deletePayrollData = async (req, res) => {
    const { id } = req.params;
    try {
        const payrollDataRepository = AppDataSource.getRepository(PayrollData);
        const payrollData = await payrollDataRepository.findOne({ where: { id: Number(id) } });
        if (!payrollData) {
            return res.status(404).json({ error: 'Payroll Data not found' });
        }
        await payrollDataRepository.remove(payrollData);
        res.json({ message: 'Payroll Data deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
