const express = require("express");
const router = express.Router();
const workerController = require("../controllers/WorkerController");

module.exports = function (AppDataSource) {
  // Create worker
  router.post("/", (req, res) =>
    workerController.createWorker(req, res, AppDataSource)
  );
  router.get("/getworkerspayroll", (req, res) =>
    workerController.getWorkersWithPayroll(req, res, AppDataSource)
  );
  // Get all workers
  router.get("/", (req, res) =>
    workerController.getWorkers(req, res, AppDataSource)
  );
  // Search workers by name
  router.get("/search", (req, res) =>
    workerController.searchByName(req, res, AppDataSource)
  );

  // Get worker by ID
  router.get("/:idNumber", (req, res) =>
    workerController.getWorkerByidNumber(req, res, AppDataSource)
  );
  // Get worker and their payrolls
  router.get("/:idNumber/payrolls", (req, res) =>
    workerController.getWorkerWithPayrolls(req, res, AppDataSource)
  );
  // Update worker
  router.put("/:idNumber", (req, res) =>
    workerController.updateWorker(req, res, AppDataSource)
  );

  // Delete worker
  router.delete("/:idNumber", (req, res) =>
    workerController.deleteWorker(req, res, AppDataSource)
  );

  return router;
};
