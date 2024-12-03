import AppDataSource from '../data-source.js';
import Worker from '../entities/Worker.js';
import WorkerNames from '../entities/WorkerNames.js';
import { ILike } from 'typeorm';

export const createWorker = async (req, res) => {
  const { idNumber, department, bankAccount, names } = req.body;

  if (!idNumber || !department || !bankAccount || !names) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workerNamesRepository = AppDataSource.getRepository(WorkerNames);

    const existingWorker = await workerRepository.findOne({ where: { idNumber } });
    if (existingWorker) {
      return res
        .status(400)
        .json({ message: "Worker with this ID number already exists" });
    }

    const worker = workerRepository.create({
      idNumber,
      department,
      bankAccount,
    });

    const newWorker = await workerRepository.save(worker);

    const workerNames = names.map((name) =>
      workerNamesRepository.create({ ...name, worker: newWorker })
    );
    await workerNamesRepository.save(workerNames);

    res.status(201).json({ ...newWorker, names: workerNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker", error });
  }
};

export const getWorkers = async (req, res) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find({ relations: ["names"] });
    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workers", error });
  }
};

export const getWorkerByidNumber = async (req, res) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["names"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching worker", error });
  }
};

export const getWorkerWithPayrolls = async (req, res) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["payrolls", "names"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching worker with payrolls", error });
  }
};

export const getWorkersWithPayroll = async (req, res) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
      relations: ["payrolls", "names"],
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching worker with payrolls", error });
  }
};

export const updateWorker = async (req, res) => {
  const { idNumber } = req.params;
  const { department, bankAccount, names } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workerNamesRepository = AppDataSource.getRepository(WorkerNames);

    const worker = await workerRepository.findOne({ where: { idNumber } });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    worker.department = department || worker.department;
    worker.bankAccount = bankAccount || worker.bankAccount;

    await workerRepository.save(worker);

    if (names) {
      await workerNamesRepository.delete({ worker });
      const workerNames = names.map((name) =>
        workerNamesRepository.create({ ...name, worker })
      );
      await workerNamesRepository.save(workerNames);
    }

    res.status(200).json({ message: "Worker updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating worker", error });
  }
};

export const deleteWorker = async (req, res) => {
  const { idNumber } = req.params;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);

    const result = await workerRepository.delete({ idNumber });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting worker", error });
  }
};

export const searchByName = async (req, res) => {
  const { name } = req.query;

  try {
    const workerNamesRepository = AppDataSource.getRepository(WorkerNames);
    const workers = await workerNamesRepository.find({
      where: [
        { firstname: ILike(`%${name}%`) },
        { lastname: ILike(`%${name}%`) },
        { middlename: ILike(`%${name}%`) },
      ],
      relations: ["worker"],
    });

    res.status(200).json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching workers by name", error });
  }
};
