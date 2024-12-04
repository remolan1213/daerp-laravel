import express from "express";
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
import {
  createWorkerName,
  getAllWorkerNames,
  getWorkerNameById,
  updateWorkerName,
  deleteWorkerName,
} from "../controllers/WorkerNamesController";

const router = express.Router();

// Worker Routes
router.post("/", createWorker); // createWorker
router.get("/getworkerspayroll", getWorkersWithPayroll); // getWorkersWithPayroll
router.get("/", getWorkers); // getWorkers
router.get("/search", searchByName); // searchByName
router.get("/:idNumber", getWorkerByidNumber); // getWorkerByidNumber
router.get("/:idNumber/payrolls", getWorkerWithPayrolls); // getWorkerWithPayrolls
router.put("/:idNumber", updateWorker); // updateWorker
router.delete("/:idNumber", deleteWorker); // deleteWorker

// Worker Names Routes
router.post("/names", createWorkerName); // createWorkerName
router.get("/names", getAllWorkerNames); // getAllWorkerNames
router.get("/names/:id", getWorkerNameById); // getWorkerNameById
router.put("/names/:id", updateWorkerName); // updateWorkerName
router.delete("/names/:id", deleteWorkerName); // deleteWorkerName

export default router;