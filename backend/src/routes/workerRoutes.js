import express from "express";
import { 
  createWorker, 
  getWorkersWithPayroll, 
  getWorkers, 
  searchByName, 
  getWorkerByidNumber, 
  getWorkerWithPayrolls, 
  updateWorker, 
  deleteWorker 
} from "../controllers/WorkerController.js";
import { 
  createWorkerName, 
  getAllWorkerNames, 
  getWorkerNameById, 
  updateWorkerName, 
  deleteWorkerName 
} from "../controllers/WorkerNamesController.js";

const router = express.Router();

export default function (AppDataSource) {
  // Worker Routes
  router.post("/", (req, res) =>
    createWorker(req, res, AppDataSource)
  );
  router.get("/getworkerspayroll", (req, res) =>
    getWorkersWithPayroll(req, res, AppDataSource)
  );
  router.get("/", (req, res) =>
    getWorkers(req, res, AppDataSource)
  );
  router.get("/search", (req, res) =>
    searchByName(req, res, AppDataSource)
  );
  router.get("/:idNumber", (req, res) =>
    getWorkerByidNumber(req, res, AppDataSource)
  );
  router.get("/:idNumber/payrolls", (req, res) =>
    getWorkerWithPayrolls(req, res, AppDataSource)
  );
  router.put("/:idNumber", (req, res) =>
    updateWorker(req, res, AppDataSource)
  );
  router.delete("/:idNumber", (req, res) =>
    deleteWorker(req, res, AppDataSource)
  );

  // Worker Names Routes
  router.post("/names", (req, res) =>
    createWorkerName(req, res, AppDataSource)
  );
  router.get("/names", (req, res) =>
    getAllWorkerNames(req, res, AppDataSource)
  );
  router.get("/names/:id", (req, res) =>
    getWorkerNameById(req, res, AppDataSource)
  );
  router.put("/names/:id", (req, res) =>
    updateWorkerName(req, res, AppDataSource)
  );
  router.delete("/names/:id", (req, res) =>
    deleteWorkerName(req, res, AppDataSource)
  );

  return router;
};
