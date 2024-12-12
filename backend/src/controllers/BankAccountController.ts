import { Request, Response } from 'express';
import AppDataSource from '../data-source';
import BankAccount from '../entities/BankAccount';

export const getBankAccounts = async (req: Request, res: Response) => {
  const bankAccounts = await AppDataSource.getRepository(BankAccount).find();
  res.json(bankAccounts);
};

export const getBankAccountById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const bankAccount = await AppDataSource.getRepository(BankAccount).findOneBy({ id });
  if (!bankAccount) {
    res.status(404).json({ message: 'Bank account not found' });
    return;
  }
  res.json(bankAccount);
};

export const createBankAccount = async (req: Request, res: Response) => {
  const bankAccountRepository = AppDataSource.getRepository(BankAccount);
  const bankAccount = bankAccountRepository.create(req.body);
  try {
    await bankAccountRepository.save(bankAccount);
    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(400).json({ message: 'Error creating bank account' });
  }
};

export const updateBankAccount = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(400).json({ message: 'Error updating bank account' });
  }
};

export const deleteBankAccount = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(400).json({ message: 'Error deleting bank account' });
  }
};
