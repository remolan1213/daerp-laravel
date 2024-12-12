import AppDataSource from "../data-source.js";
import Worker from "../entities/Worker.js";
import { ILike } from "typeorm";
// **FUNCTION: CREATE WORKER**
export const createWorker = async (req, res) => {
    const workerRepository = AppDataSource.getRepository(Worker);
    try {
        const worker = workerRepository.create(req.body);
        await workerRepository.save(worker);
        res.status(201).json(worker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating worker", error });
    }
};
// **FUNCTION: GET WORKERS**
export const getWorkers = async (req, res) => {
    try {
        const workerRepository = AppDataSource.getRepository(Worker);
        const workers = await workerRepository.find();
        res.json(workers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving workers", error });
    }
};
// **FUNCTION: GET WORKER BY ID NUMBER**
export const getWorkerByidNumber = async (req, res) => {
    const idNumber = req.params.idNumber; // Ensure idNumber is a string
    try {
        const workerRepository = AppDataSource.getRepository(Worker);
        const worker = await workerRepository.findOne({
            where: { idNumber },
        });
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }
        res.json(worker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving worker", error });
    }
};
// **FUNCTION: GET WORKER WITH PAYROLLS**
export const getWorkerWithPayrolls = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving worker with payrolls", error });
    }
};
// **FUNCTION: GET WORKERS WITH PAYROLL**
export const getWorkersWithPayroll = async (req, res) => {
    try {
        const workerRepository = AppDataSource.getRepository(Worker);
        const workers = await workerRepository.find({ relations: ["payrolls"] });
        res.json(workers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving workers with payroll", error });
    }
};
// **FUNCTION: UPDATE WORKER**
export const updateWorker = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating worker", error });
    }
};
// **FUNCTION: DELETE WORKER**
export const deleteWorker = async (req, res) => {
    const { idNumber } = req.params;
    try {
        const workerRepository = AppDataSource.getRepository(Worker);
        const worker = await workerRepository.findOne({ where: { idNumber } });
        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }
        await workerRepository.remove(worker);
        res.json({ message: "Worker deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting worker", error });
    }
};
// **FUNCTION: SEARCH BY NAME**
export const searchByName = async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching workers by name", error });
    }
};
