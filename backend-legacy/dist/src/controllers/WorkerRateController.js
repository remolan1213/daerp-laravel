import AppDataSource from "../data-source.js";
import WorkerRate from "../entities/WorkerRate.js";
// **FUNCTION: GET ALL WORKER RATES**
export const getWorkerRates = async (req, res) => {
    try {
        const workerRateRepository = AppDataSource.getRepository(WorkerRate);
        const workerRates = await workerRateRepository.find();
        res.json(workerRates);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving worker rates", error });
    }
};
// **FUNCTION: GET WORKER RATE BY ID**
export const getWorkerRateById = async (req, res) => {
    const id = req.params.id;
    try {
        const workerRateRepository = AppDataSource.getRepository(WorkerRate);
        const workerRate = await workerRateRepository.findOneBy({ id: Number(id) });
        if (!workerRate) {
            return res.status(404).json({ message: "Worker rate not found" });
        }
        res.json(workerRate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving worker rate", error });
    }
};
// **FUNCTION: CREATE WORKER RATE**
export const createWorkerRate = async (req, res) => {
    const workerRateRepository = AppDataSource.getRepository(WorkerRate);
    try {
        const workerRate = workerRateRepository.create(req.body);
        await workerRateRepository.save(workerRate);
        res.status(201).json(workerRate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating worker rate", error });
    }
};
// **FUNCTION: UPDATE WORKER RATE**
export const updateWorkerRate = async (req, res) => {
    const id = req.params.id;
    try {
        const workerRateRepository = AppDataSource.getRepository(WorkerRate);
        const workerRate = await workerRateRepository.findOneBy({ id: Number(id) });
        if (!workerRate) {
            return res.status(404).json({ message: "Worker rate not found" });
        }
        await workerRateRepository.update(id, req.body);
        res.json(workerRate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating worker rate", error });
    }
};
// **FUNCTION: DELETE WORKER RATE**
export const deleteWorkerRate = async (req, res) => {
    const id = req.params.id;
    try {
        const workerRateRepository = AppDataSource.getRepository(WorkerRate);
        const workerRate = await workerRateRepository.findOneBy({ id: Number(id) });
        if (!workerRate) {
            return res.status(404).json({ message: "Worker rate not found" });
        }
        await workerRateRepository.delete(id);
        res.json({ message: "Worker rate deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting worker rate", error });
    }
};
// list of functions
// 1. getWorkerRates -> get all worker rates
// 2. getWorkerRateById -> get worker rate by id
// 3. createWorkerRate -> create worker rate
// 4. updateWorkerRate -> update worker rate
// 5. deleteWorkerRate -> delete worker rate
