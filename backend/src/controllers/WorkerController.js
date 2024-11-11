const Worker = require("../entity/Worker"); // Entity schema
require("typeorm"); // Assuming AppDataSource is an instance of DataSource
const { ILike } = require("typeorm");
const createWorker = async (req, res, AppDataSource) => {
  const { name, idNumber, department } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);

    // Check if the worker already exists with the given idNumber
    const existingWorker = await workerRepository.findOne({
      where: { idNumber },
    });
    if (existingWorker) {
      return res
        .status(400)
        .json({ message: "Worker with this ID number already exists" });
    }

    // Create a new worker object
    const worker = workerRepository.create({
      name,
      idNumber,
      department,
    });

    // Save the new worker to the database
    const newWorker = await workerRepository.save(worker);
    res.status(201).json(newWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker", error });
  }
};

const getWorkers = async (req, res, AppDataSource) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find();
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workers", error });
  }
};

const getWorkerByidNumber = async (req, res, AppDataSource) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({ where: { idNumber } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found 1" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching worker", error });
  }
};

// Get worker with their payrolls
const getWorkerWithPayrolls = async (req, res, AppDataSource) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["payrolls"], // Include payrolls in the result
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Send back worker with their payrolls
    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching worker with payrolls", error });
  }
};

const updateWorker = async (req, res, AppDataSource) => {
  const { idNumber } = req.params;
  const { name, department } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({ where: { id } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found 2" });
    }

    worker.name = name || worker.name;
    worker.idNumber = idNumber || worker.idNumber;
    worker.department = department || worker.department;

    const updatedWorker = await workerRepository.save(worker);
    res.status(200).json(updatedWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating worker", error });
  }
};

const deleteWorker = async (req, res, AppDataSource) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({ where: { id } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found 3" });
    }

    await workerRepository.remove(worker);
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker", error });
  }
};

// Search Workers by Name (exact match or partial match)
const searchByName = async (req, res, AppDataSource) => {
  const { name } = req.query; // get the name from the query parameter

  if (!name) {
    return res.status(400).json({ message: "Please provide a name to search" });
  }

  try {
    const workerRepository = AppDataSource.getRepository(Worker);

    // Search workers by name (using "LIKE" for partial match)
    const workers = await workerRepository.find({
      where: {
        name: ILike(`%${name}%`), // Partial match search (case-insensitive)
      },
    });

    if (workers.length === 0) {
      return res
        .status(404)
        .json({ message: "No workers found with that name" });
    }

    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching workers by name", error });
  }
};

module.exports = {
  createWorker,
  getWorkers,
  getWorkerByidNumber,
  getWorkerWithPayrolls,
  updateWorker,
  deleteWorker,
  searchByName,
};
