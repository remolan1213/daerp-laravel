import AppDataSource from "../data-source.js";
import CashAdvance from "../entities/CashAdvance.js";

const getAllCashAdvances = async (req, res) => {
  try {
    const cashAdvances = await AppDataSource.getRepository(CashAdvance).find();
    res.json(cashAdvances);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCashAdvance = async (req, res) => {
  try {
    const cashAdvance = await AppDataSource.getRepository(CashAdvance).save(
      req.body
    );
    res.status(201).json(cashAdvance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCashAdvanceById = async (req, res) => {
  try {
    const cashAdvance = await AppDataSource.getRepository(CashAdvance).findOne(
      req.params.id
    );
    if (!cashAdvance) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    res.json(cashAdvance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCashAdvance = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(CashAdvance).update(
      req.params.id,
      req.body
    );
    if (result.affected === 0) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    res.json({ message: "Cash Advance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCashAdvance = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(CashAdvance).delete(
      req.params.id
    );
    if (result.affected === 0) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    res.json({ message: "Cash Advance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAllCashAdvances,
  createCashAdvance,
  getCashAdvanceById,
  updateCashAdvance,
  deleteCashAdvance,
};
