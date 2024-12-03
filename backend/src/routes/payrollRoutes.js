import express from 'express';
import payrollController from '../controllers/PayrollController.js';
import payrollDataController from '../controllers/PayrollDataController.js';

const router = express.Router();

export default function(AppDataSource) {
  // Payroll Routes
  router.post('/', (req, res) => payrollController.createPayroll(req, res, AppDataSource));
  router.get('/', (req, res) => payrollController.getPayrolls(req, res, AppDataSource));
  router.get('/:id', (req, res) => payrollController.getPayrollById(req, res, AppDataSource));
  router.put('/:id', (req, res) => payrollController.updatePayroll(req, res, AppDataSource));
  router.delete('/:id', (req, res) => payrollController.deletePayroll(req, res, AppDataSource));

  // Payroll Data Routes
  router.post('/data', (req, res) => payrollDataController.createPayrollData(req, res, AppDataSource));
  router.get('/data', (req, res) => payrollDataController.getAllPayrollData(req, res, AppDataSource));
  router.get('/data/:id', (req, res) => payrollDataController.getPayrollDataById(req, res, AppDataSource));
  router.put('/data/:id', (req, res) => payrollDataController.updatePayrollData(req, res, AppDataSource));
  router.delete('/data/:id', (req, res) => payrollDataController.deletePayrollData(req, res, AppDataSource));

  return router;
};
