import { Router, Request, Response } from 'express';
import {
  createCashAdvance,
  getAllCashAdvances,
  getCashAdvanceById,
  updateCashAdvance,
  deleteCashAdvance,
} from '../controllers/CashAdvanceController';
import {
  createCashAdvanceDate,
  getAllCashAdvanceDates,
  getCashAdvanceDateById,
  updateCashAdvanceDate,
  deleteCashAdvanceDate,
} from '../controllers/CashAdvanceDatesController';

const router = Router();

// Cash Advance Routes
router.post('/', createCashAdvance);
router.get('/', getAllCashAdvances);
// router.get('/:id', getCashAdvanceById);
// router.put('/:id', updateCashAdvance);
// router.delete('/:id', deleteCashAdvance);

// Cash Advance Dates Routes
router.post('/dates', createCashAdvanceDate);
router.get('/dates', getAllCashAdvanceDates);
// router.get('/dates/:id', getCashAdvanceDateById);
// router.put('/dates/:id', updateCashAdvanceDate);
// router.delete('/dates/:id', deleteCashAdvanceDate);

export default router;