import express from 'express';
import {
  createPayroll,
  getPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  getPayrollSummary,
  getPayrollTotals
} from '../controllers/PayrollController';
import { validatePayrollPayload } from "../middleware/validate";

const router = express.Router();

// Payroll Routes
router.post('/', validatePayrollPayload, createPayroll); // createPayroll
router.get('/', getPayrolls); // getPayrolls
router.get('/summary', getPayrollTotals); // totals summary
router.get('/latest', getPayrollSummary); // latest payroll summary for UI
router.get('/:id', getPayrollById); // getPayrollById
router.put('/:id', validatePayrollPayload, updatePayroll); // updatePayroll
router.delete('/:id', deletePayroll); // deletePayroll

export default router;
