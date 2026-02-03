import AppDataSource from "./data-source";
import Worker from "./entities/Worker";
import Payroll from "./entities/Payroll";

const seed = async () => {
  await AppDataSource.initialize();

  const workerRepo = AppDataSource.getRepository(Worker);
  const payrollRepo = AppDataSource.getRepository(Payroll);

  const existingWorkers = await workerRepo.count();
  const existingPayrolls = await payrollRepo.count();

  if (existingWorkers === 0) {
    const worker = workerRepo.create({
      idNumber: "2026-0001",
      department: "Graphics",
      bankAccount: "AUB 327-011-000114-7",
      firstName: "Jake",
      middleName: "R",
      lastName: "Gaviola",
    });
    await workerRepo.save(worker);
  }

  if (existingPayrolls === 0) {
    const worker = await workerRepo.findOne({ where: { idNumber: "2026-0001" } });
    const payroll = payrollRepo.create({
      payrollPeriod: "January 1-31, 2026",
      payrollDate: "February 2, 2026",
      client: "Graphics Works",
      grossAmount: 11630,
      netAmount: 581.5,
      deductions: "None",
      deductionAmount: 0,
      totalAmount: 581.5,
      rate: 0.05,
      worker: worker ?? undefined,
    });
    await payrollRepo.save(payroll);
  }

  await AppDataSource.destroy();
  console.log("Seed complete.");
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
