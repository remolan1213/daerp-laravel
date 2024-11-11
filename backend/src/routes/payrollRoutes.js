const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/PayrollController');

module.exports = function(AppDataSource) {
  // Create payroll
  router.post('/', (req, res) => payrollController.createPayroll(req, res, AppDataSource));

  // Get all payrolls
  router.get('/', (req, res) => payrollController.getPayrolls(req, res, AppDataSource));

  // Get payroll by ID
  router.get('/:id', (req, res) => payrollController.getPayrollById(req, res, AppDataSource));

  // Update payroll
  router.put('/:id', (req, res) => payrollController.updatePayroll(req, res, AppDataSource));

  // Delete payroll
  router.delete('/:id', (req, res) => payrollController.deletePayroll(req, res, AppDataSource));

  return router;
};
