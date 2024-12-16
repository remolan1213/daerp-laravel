import { Router } from 'express';
import { getBankAccountById, createBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount, getBankAccountByAccountNumber } from '../controllers/BankAccountController.js'; // Adjust the import path as needed
const router = Router();
router.get('/:id', getBankAccountById);
router.post('/', createBankAccount);
router.get('/', getBankAccounts);
router.put('/:id', updateBankAccount);
router.delete('/:id', deleteBankAccount);
router.get('/accountNumber/:accountNumber', getBankAccountByAccountNumber);
export default router;
