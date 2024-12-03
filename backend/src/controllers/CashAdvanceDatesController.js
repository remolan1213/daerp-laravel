import AppDataSource from '../data-source.js';
import CashAdvanceDates from '../entities/CashAdvanceDates.js';

const getAllCashAdvanceDates = async (req, res) => {
  try {
    const cashAdvanceDates = await AppDataSource.getRepository(CashAdvanceDates).find();
    res.json(cashAdvanceDates);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCashAdvanceDate = async (req, res) => {
  try {
    const cashAdvanceDate = await AppDataSource.getRepository(CashAdvanceDates).save(req.body);
    res.status(201).json(cashAdvanceDate);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCashAdvanceDateById = async (req, res) => {
  try {
    const cashAdvanceDate = await AppDataSource.getRepository(CashAdvanceDates).findOne(req.params.id);
    if (!cashAdvanceDate) {
      return res.status(404).json({ error: 'Cash Advance Date not found' });
    }
    res.json(cashAdvanceDate);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCashAdvanceDate = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(CashAdvanceDates).update(req.params.id, req.body);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Cash Advance Date not found' });
    }
    res.json({ message: 'Cash Advance Date updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCashAdvanceDate = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(CashAdvanceDates).delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Cash Advance Date not found' });
    }
    res.json({ message: 'Cash Advance Date deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default {
  getAllCashAdvanceDates,
  createCashAdvanceDate,
  getCashAdvanceDateById,
  updateCashAdvanceDate,
  deleteCashAdvanceDate,
};
