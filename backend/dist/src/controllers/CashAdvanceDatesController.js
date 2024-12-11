import AppDataSource from '../data-source.js';
import CashAdvanceDates from '../entities/CashAdvanceDates.js';
// **FUNCTION: GET ALL CASH ADVANCE DATES**
export const getAllCashAdvanceDates = async (req, res) => {
    try {
        const cashAdvanceDates = await AppDataSource.getRepository(CashAdvanceDates).find();
        res.json(cashAdvanceDates);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: CREATE CASH ADVANCE DATE**
export const createCashAdvanceDate = async (req, res) => {
    try {
        const { dateRequested, dateGiven, cashAdvance } = req.body;
        const cashAdvanceDate = new CashAdvanceDates();
        cashAdvanceDate.dateRequested = dateRequested;
        cashAdvanceDate.dateGiven = dateGiven;
        cashAdvanceDate.cashAdvance = cashAdvance;
        const savedCashAdvanceDate = await AppDataSource.getRepository(CashAdvanceDates).save(cashAdvanceDate);
        res.status(201).json(savedCashAdvanceDate);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: GET CASH ADVANCE DATE BY ID**
export const getCashAdvanceDateById = async (req, res) => {
    const { id } = req.params;
    try {
        const cashAdvanceDate = await AppDataSource.getRepository(CashAdvanceDates).findOne({ where: { id: Number(id) } });
        if (!cashAdvanceDate) {
            return res.status(404).json({ error: `Cash Advance Date with id ${id} not found` });
        }
        res.json(cashAdvanceDate);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: UPDATE CASH ADVANCE DATE**
export const updateCashAdvanceDate = async (req, res) => {
    const { id } = req.params;
    try {
        const cashAdvanceDatesRepository = AppDataSource.getRepository(CashAdvanceDates);
        const cashAdvanceDate = await cashAdvanceDatesRepository.findOne({ where: { id: Number(id) } });
        if (!cashAdvanceDate) {
            return res.status(404).json({ error: `Cash Advance Date with id ${id} not found` });
        }
        // Explicitly pick only allowed update properties
        const updateData = {
            ...(req.body.dateRequested && { dateRequested: req.body.dateRequested }),
            ...(req.body.dateGiven && { dateGiven: req.body.dateGiven }),
            ...(req.body.cashAdvance && { cashAdvance: req.body.cashAdvance })
        };
        await cashAdvanceDatesRepository.update(id, updateData);
        const updatedCashAdvanceDate = await cashAdvanceDatesRepository.findOne({ where: { id: Number(id) } });
        res.json(updatedCashAdvanceDate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// **FUNCTION: DELETE CASH ADVANCE DATE**
export const deleteCashAdvanceDate = async (req, res) => {
    const { id } = req.params;
    try {
        const cashAdvanceDatesRepository = AppDataSource.getRepository(CashAdvanceDates);
        const cashAdvanceDate = await cashAdvanceDatesRepository.findOne({ where: { id: Number(id) } });
        if (!cashAdvanceDate) {
            return res.status(404).json({ error: `Cash Advance Date with id ${id} not found` });
        }
        await cashAdvanceDatesRepository.remove(cashAdvanceDate);
        res.json({ message: 'Cash Advance Date deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
