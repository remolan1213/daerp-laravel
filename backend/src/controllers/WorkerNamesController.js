import AppDataSource from "../data-source.js";
import WorkerNames from "../entities/WorkerNames.js";

const getAllWorkerNames = async (req, res) => {
  try {
    const workerNames = await AppDataSource.getRepository(WorkerNames).find();
    res.json(workerNames);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createWorkerName = async (req, res) => {
  try {
    const workerName = await AppDataSource.getRepository(WorkerNames).save(
      req.body
    );
    res.status(201).json(workerName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWorkerNameById = async (req, res) => {
  try {
    const workerName = await AppDataSource.getRepository(WorkerNames).findOne(
      req.params.id
    );
    if (!workerName) {
      return res.status(404).json({ error: "Worker Name not found" });
    }
    res.json(workerName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateWorkerName = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(WorkerNames).update(
      req.params.id,
      req.body
    );
    if (result.affected === 0) {
      return res.status(404).json({ error: "Worker Name not found" });
    }
    res.json({ message: "Worker Name updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteWorkerName = async (req, res) => {
  try {
    const result = await AppDataSource.getRepository(WorkerNames).delete(
      req.params.id
    );
    if (result.affected === 0) {
      return res.status(404).json({ error: "Worker Name not found" });
    }
    res.json({ message: "Worker Name deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllWorkerNames,
  createWorkerName,
  getWorkerNameById,
  updateWorkerName,
  deleteWorkerName,
};
