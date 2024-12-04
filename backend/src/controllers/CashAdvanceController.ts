import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import CashAdvance from "../entities/CashAdvance";

interface CreateCashAdvanceRequest {
  // Add properties for the request body here
}

interface UpdateCashAdvanceRequest {
  // Add properties for the request body here
}

// **FUNCTION: GET ALL CASH ADVANCES**
export const getAllCashAdvances = async (req: Request, res: Response) => {
  try {
    const cashAdvances = await AppDataSource.getRepository(CashAdvance).find();
    res.json(cashAdvances);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **FUNCTION: CREATE CASH ADVANCE**
export const createCashAdvance = async (req: Request<{}, {}, CreateCashAdvanceRequest>, res: Response) => {
  try {
    const cashAdvance = await AppDataSource.getRepository(CashAdvance).save(
      req.body
    );
    res.status(201).json(cashAdvance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **FUNCTION: GET CASH ADVANCE BY ID**
export const getCashAdvanceById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const cashAdvance = await AppDataSource.getRepository(CashAdvance).findOne({ where: { id: parseInt(id, 10) } });
    if (!cashAdvance) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    res.json(cashAdvance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **FUNCTION: UPDATE CASH ADVANCE**
export const updateCashAdvance = async (req: Request<{ id: string }, {}, UpdateCashAdvanceRequest>, res: Response) => {
  const { id } = req.params;
  try {
    const cashAdvanceRepository = AppDataSource.getRepository(CashAdvance);
    const cashAdvance = await cashAdvanceRepository.findOne({ where: { id: Number(id) } });
    if (!cashAdvance) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    await cashAdvanceRepository.update(id, req.body);
    const updatedCashAdvance = await cashAdvanceRepository.findOne({ where: { id: Number(id) } });
    res.json(updatedCashAdvance);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// **FUNCTION: DELETE CASH ADVANCE**
export const deleteCashAdvance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cashAdvanceRepository = AppDataSource.getRepository(CashAdvance);
    const cashAdvance = await cashAdvanceRepository.findOne({ where: { id: Number(id) } });
    if (!cashAdvance) {
      return res.status(404).json({ error: "Cash Advance not found" });
    }
    await cashAdvanceRepository.remove(cashAdvance);
    res.json({ message: "Cash Advance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
