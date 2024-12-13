import express,{ Request, RequestHandler, Response} from "express";
import AppDataSource from "../data-source";
import Worker from "../entities/Worker";
import { ILike, Repository } from "typeorm";

interface WorkerRequestBody {
  idNumber: string;
  department: string;
  bankAccount: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

interface UpdateWorkerRequestBody {
  newIdNumber?: string;
  department: string;
  bankAccount: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

// **FUNCTION: CREATE WORKER**
export const createWorker = async (req: Request, res: Response) => {
  const workerRepository: Repository<Worker> = AppDataSource.getRepository(Worker);

  try {
    const worker = workerRepository.create(req.body as WorkerRequestBody);
    await workerRepository.save(worker);

    res.status(201).json(worker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating worker", error });
  }
};


// **FUNCTION: GET WORKERS**
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const workers = await workerRepository.find();
    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving workers", error });
  }
};

// **FUNCTION: GET WORKER BY ID NUMBER**


export const getWorkerByidNumber = async (req: Request, res: Response) => {
  const idNumber:string = req.params.idNumber as string; // Ensure idNumber is a string

  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    const worker = await workerRepository.findOne({
      where: { idNumber },
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
  const { newIdNumber, department, bankAccount, firstName, lastName, middleName } = req.body;

  try {
    const workerRepository = AppDataSource.getRepository(Worker);

    const worker = await workerRepository.findOne({
      where: { idNumber },
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    if (newIdNumber) {
      worker.idNumber = newIdNumber;
    }

    worker.department = department;
    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.middleName = middleName;

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
      where: [
        { firstName: ILike(`%${name}%`) },
        { lastName: ILike(`%${name}%`) },
        { middleName: ILike(`%${name}%`) },
      ],
    });

    res.json(workers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching workers by name", error });
  }
};

/*
1. createWorker - POST /workers
   - Creates a new worker
   - Parameters: WorkerRequestBody (firstName, lastName, middleName, department, bankAccount)

2. getWorkers - GET /workers
   - Retrieves all workers
   - Parameters: None

3. getWorkerByidNumber - GET /workers/:idNumber
   - Retrieves a worker by idNumber
   - Parameters: idNumber (string)

4. getWorkerWithPayrolls - GET /workers/:idNumber/payrolls
   - Retrieves a worker with associated payrolls
   - Parameters: idNumber (string)

5. updateWorker - PUT /workers/:idNumber
   - Updates a worker
   - Parameters: idNumber (string), UpdateWorkerRequestBody (newIdNumber, department, bankAccount, firstName, lastName, middleName)

6. deleteWorker - DELETE /workers/:idNumber
   - Deletes a worker
   - Parameters: idNumber (string)

7. searchByName - GET /workers?name=:name
   - Searches for workers by name
   - Parameters: name (string)
*/
