import express from "express";
import { createWorker, getWorkersWithPayroll, getWorkers, searchByName, getWorkerByidNumber, getWorkerWithPayrolls, updateWorker, deleteWorker, } from "../controllers/WorkerController.js";
import { createWorkerRate, getWorkerRates, getWorkerRateById, updateWorkerRate, deleteWorkerRate, } from "../controllers/WorkerRateController.js";
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
// WorkerRate Routes
router.post("/rate", createWorkerRate); // createWorkerRate
router.get("/rates", getWorkerRates); // getWorkerRates
router.get("/rates/:id", getWorkerRateById); // getWorkerRateById
router.put("/rates/:id", updateWorkerRate); // updateWorkerRate
router.delete("/rates/:id", deleteWorkerRate); // deleteWorkerRate
export default router;
