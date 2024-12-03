import express from 'express';
import cashAdvanceController from '../controllers/CashAdvanceController.js';
import cashAdvanceDatesController from '../controllers/CashAdvanceDatesController.js';

const router = express.Router();

export default function(AppDataSource) {
  // Cash Advance Routes
  router.post('/', (req, res) => cashAdvanceController.createCashAdvance(req, res, AppDataSource));
  router.get('/', (req, res) => cashAdvanceController.getAllCashAdvances(req, res, AppDataSource));
  router.get('/:id', (req, res) => cashAdvanceController.getCashAdvanceById(req, res, AppDataSource));
  router.put('/:id', (req, res) => cashAdvanceController.updateCashAdvance(req, res, AppDataSource));
  router.delete('/:id', (req, res) => cashAdvanceController.deleteCashAdvance(req, res, AppDataSource));

  // Cash Advance Dates Routes
  router.post('/dates', (req, res) => cashAdvanceDatesController.createCashAdvanceDate(req, res, AppDataSource));
  router.get('/dates', (req, res) => cashAdvanceDatesController.getAllCashAdvanceDates(req, res, AppDataSource));
  router.get('/dates/:id', (req, res) => cashAdvanceDatesController.getCashAdvanceDateById(req, res, AppDataSource));
  router.put('/dates/:id', (req, res) => cashAdvanceDatesController.updateCashAdvanceDate(req, res, AppDataSource));
  router.delete('/dates/:id', (req, res) => cashAdvanceDatesController.deleteCashAdvanceDate(req, res, AppDataSource));

  return router;
};
