import { Router, Request, Response } from "express";
import {
  createCashAdvance,
  getAllCashAdvances,
  getCashAdvanceById,
  updateCashAdvance,
  deleteCashAdvance,
} from "../controllers/CashAdvanceController";

const router = Router();

// Cash Advance Routes
router.post("/", createCashAdvance);
router.get("/", getAllCashAdvances);
router.get("/:id", getCashAdvanceById);
router.put("/:id", updateCashAdvance);
router.delete("/:id", deleteCashAdvance);

export default router;
