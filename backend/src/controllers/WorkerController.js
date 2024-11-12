const Worker = require("../entity/Worker"); // Entity schema
const { ILike } = require("typeorm");

const createWorker = async (req, res, AppDataSource) => {
  const { firstname, middlename, lastname, idNumber, department, bankAccount } =
    req.body;

  // Ensure all required fields are provided
  if (!firstname || !middlename || !lastname || !idNumber || !department || !bankAccount) {
    return res.status(400).json({ message: "Missing required fields" });
  }
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
      firstname,
      lastname,
      middlename,
      idNumber,
      department,
      bankAccount,
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
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching worker", error });
  }
};

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
  const { firstname, lastname, middlename, department, bankAccount } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({ where: { idNumber } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Update fields if provided in request body
    worker.firstname = firstname || worker.firstname;
    worker.lastname = lastname || worker.lastname;
    worker.middlename = middlename || worker.middlename;
    worker.department = department || worker.department;
    worker.bankAccount = bankAccount || worker.bankAccount;

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
    const worker = await workerRepository.findOne({ where: { idNumber } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    await workerRepository.remove(worker);
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker", error });
  }
};

// Search Workers by partial or full name match
const searchByName = async (req, res, AppDataSource) => {
  const { name } = req.query; // get the name from the query parameter

  if (!name) {
    return res.status(400).json({ message: "Please provide a name to search" });
  }

  try {
    const workerRepository = AppDataSource.getRepository(Worker);

    // Search workers by partial match on first, middle, or last name
    const workers = await workerRepository.find({
      where: [
        { firstname: ILike(`%${name}%`) },
        { lastname: ILike(`%${name}%`) },
        { middlename: ILike(`%${name}%`) },
      ],
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
