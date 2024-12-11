import express from 'express';
import { createPayroll, getPayrolls, getPayrollById, updatePayroll, deletePayroll } from '../controllers/PayrollController.js';
import { createPayrollData, getAllPayrollData, getPayrollDataById, updatePayrollData, deletePayrollData } from '../controllers/PayrollDataController.js';
const router = express.Router();
// Payroll Routes
router.post('/', createPayroll); // createPayroll
router.get('/', getPayrolls); // getPayrolls
router.get('/:id', getPayrollById); // getPayrollById
router.put('/:id', updatePayroll); // updatePayroll
router.delete('/:id', deletePayroll); // deletePayroll
// Payroll Data Routes
router.post('/data', createPayrollData); // createPayrollData
router.get('/data', getAllPayrollData); // getAllPayrollData
router.get('/data/:id', getPayrollDataById); // getPayrollDataById
router.put('/data/:id', updatePayrollData); // updatePayrollData
router.delete('/data/:id', deletePayrollData); // deletePayrollData
export default router;
