import express from "express";
import { createWorker, getWorkersWithPayroll, getWorkers, searchByName, getWorkerByidNumber, } from "../controllers/WorkerController.js";
import { createWorkerName, getAllWorkerNames, } from "../controllers/WorkerNamesController.js";
const router = express.Router();
// Worker Routes
router.post("/", createWorker); // createWorker
router.get("/getworkerspayroll", getWorkersWithPayroll); // getWorkersWithPayroll
router.get("/", getWorkers); // getWorkers
router.get("/search", searchByName); // searchByName
router.get("/:idNumber", getWorkerByidNumber); // getWorkerByidNumber
// router.get("/:idNumber/payrolls", getWorkerWithPayrolls); // getWorkerWithPayrolls
// router.put("/:idNumber", updateWorker); // updateWorker
// router.delete("/:idNumber", deleteWorker); // deleteWorker
// Worker Names Routes
router.post("/names", createWorkerName); // createWorkerName
router.get("/names", getAllWorkerNames); // getAllWorkerNames
// router.get("/names/:id", getWorkerNameById); // getWorkerNameById
// router.put("/names/:id", updateWorkerName); // updateWorkerName
// router.delete("/names/:id", deleteWorkerName); // deleteWorkerName
export default router;
