import AppDataSource from '../data-source.js';
import BankAccount from '../entities/BankAccount.js';
// **FUNCTION: GET ALL BANK ACCOUNTS**
export const getBankAccounts = async (req, res) => {
    const bankAccounts = await AppDataSource.getRepository(BankAccount).find();
    res.json(bankAccounts);
};
// **FUNCTION: GET BANK ACCOUNT BY ID**
export const getBankAccountById = async (req, res) => {
    const id = Number(req.params.id);
    const bankAccount = await AppDataSource.getRepository(BankAccount).findOneBy({ id });
    if (!bankAccount) {
        res.status(404).json({ message: 'Bank account not found' });
        return;
    }
    res.json(bankAccount);
};
// **FUNCTION: CREATE BANK ACCOUNT**
export const createBankAccount = async (req, res) => {
    const bankAccountRepository = AppDataSource.getRepository(BankAccount);
    const bankAccount = bankAccountRepository.create(req.body);
    try {
        await bankAccountRepository.save(bankAccount);
        res.status(201).json(bankAccount);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating bank account' });
    }
};
// **FUNCTION: UPDATE BANK ACCOUNT**
export const updateBankAccount = async (req, res) => {
    const id = Number(req.params.id);
    const bankAccountRepository = AppDataSource.getRepository(BankAccount);
    const bankAccount = await bankAccountRepository.preload(req.body);
    if (!bankAccount) {
        res.status(404).json({ message: 'Bank account not found' });
        return;
    }
    try {
        await bankAccountRepository.save(bankAccount);
        res.json(bankAccount);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating bank account' });
    }
};
// **FUNCTION: DELETE BANK ACCOUNT**
export const deleteBankAccount = async (req, res) => {
    const id = Number(req.params.id);
    const bankAccountRepository = AppDataSource.getRepository(BankAccount);
    const bankAccount = await bankAccountRepository.findOneBy({ id });
    if (!bankAccount) {
        res.status(404).json({ message: 'Bank account not found' });
        return;
    }
    try {
        await bankAccountRepository.remove(bankAccount);
        res.status(204).json({});
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting bank account' });
    }
};
// **FUNCTION: GET BANK ACCOUNT BY ACCOUNT NUMBER**
export const getBankAccountByAccountNumber = async (req, res) => {
    const accountNumber = req.params.accountNumber;
    const bankAccountRepository = AppDataSource.getRepository(BankAccount);
    const bankAccount = await bankAccountRepository.findOneBy({ accountNumber });
    if (!bankAccount) {
        res.status(404).json({ message: 'Bank account not found' });
        return;
    }
    res.json(bankAccount);
};
// **FUNCTION LIST**
// 1. getBankAccountById: Get a bank account by id
// 2. createBankAccount: Create a new bank account
// 3. getBankAccounts: Get all bank accounts
// 4. updateBankAccount: Update a bank account
// 5. deleteBankAccount: Delete a bank account
// 6. getBankAccountByAccountNumber: Get a bank account by account number
