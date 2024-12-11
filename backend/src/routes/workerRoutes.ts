import express, { Router } from "express";
import {
  createWorker,
  getWorkersWithPayroll,
  getWorkers,
  searchByName,
  getWorkerByidNumber,
  getWorkerWithPayrolls,
  updateWorker,
  deleteWorker,
} from "../controllers/WorkerController";

const router:Router = express.Router();

// Worker Routes
router.post("/", createWorker); // createWorker
router.get("/getworkerspayroll", getWorkersWithPayroll); // getWorkersWithPayroll
router.get("/", getWorkers); // getWorkers
router.get("/search", searchByName); // searchByName
router.get("/:idNumber", getWorkerByidNumber); // getWorkerByidNumber
router.get("/:idNumber/payrolls", getWorkerWithPayrolls); // getWorkerWithPayrolls
router.put("/:idNumber", updateWorker); // updateWorker
router.delete("/:idNumber", deleteWorker); // deleteWorker

export default router;
