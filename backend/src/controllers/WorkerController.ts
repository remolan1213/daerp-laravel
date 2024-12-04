import { Request, Response } from "express";
import AppDataSource from "../data-source";
import Worker from "../entities/Worker";
import WorkerNames from "../entities/WorkerNames";
import { ILike, Repository } from "typeorm";

interface WorkerRequestBody {
  idNumber: string;
  department: string;
  bankAccount: string;
  names: {
    firstname: string;
    lastname: string;
    middlename: string;
  }[];
}

interface UpdateWorkerRequestBody {
  department: string;
  bankAccount: string;
  names: {
    firstname: string;
    lastname: string;
    middlename: string;
  }[];
}

// **FUNCTION: CREATE WORKER**
export const createWorker = async (
  req: Request<{}, {}, WorkerRequestBody>,
  res: Response
) => {
  const { idNumber, department, bankAccount, names } = req.body;

  if (!idNumber || !department || !bankAccount || !names) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workerNamesRepository = AppDataSource.getRepository(WorkerNames);

    const existingWorker = await workerRepository.findOne({
      where: { idNumber },
    });
    if (existingWorker) {
      return res
        .status(400)
        .json({ message: "Worker with this ID number already exists" });
    }

    const newWorker = workerRepository.create({
      idNumber,
      department,
      bankAccount,
      names: names.map((name) => workerNamesRepository.create(name)),
    });
    await workerRepository.save(newWorker);

    res.status(201).json(newWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker", error });
  }
};

// **FUNCTION: GET WORKERS**
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find({
      relations: ["names", "payrolls", "cashAdvances"],
    });
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving workers", error });
  }
};

// **FUNCTION: GET WORKER BY ID NUMBER**
export const getWorkerByidNumber = async (req: Request, res: Response) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["names", "payrolls", "cashAdvances"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving worker", error });
  }
};

// **FUNCTION: GET WORKER WITH PAYROLLS**
export const getWorkerWithPayrolls = async (req: Request, res: Response) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["payrolls"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving worker with payrolls", error });
  }
};

// **FUNCTION: GET WORKERS WITH PAYROLL**
export const getWorkersWithPayroll = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find({ relations: ["payrolls"] });
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving workers with payroll", error });
  }
};

// **FUNCTION: UPDATE WORKER**
export const updateWorker = async (
  req: Request<{ idNumber: string }, {}, UpdateWorkerRequestBody>,
  res: Response
) => {
  const { idNumber } = req.params;
  const { department, bankAccount, names } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workerNamesRepository = AppDataSource.getRepository(WorkerNames);

    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["names"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    worker.department = department;
    worker.bankAccount = bankAccount;
    worker.names = names.map((name) => workerNamesRepository.create(name));

    await workerRepository.save(worker);

    res.json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating worker", error });
  }
};

// **FUNCTION: DELETE WORKER**
export const deleteWorker = async (
  req: Request<{ idNumber: string }>,
  res: Response
) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({ where: { idNumber } });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    await workerRepository.remove(worker);

    res.json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker", error });
  }
};

// **FUNCTION: SEARCH BY NAME**
export const searchByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find({
      where: {
        names: {
          firstname: ILike(`%${name}%`),
        },
      },
      relations: ["names"],
    });

    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching workers by name", error });
  }
};
