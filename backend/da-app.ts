import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import AppDataSource from "./src/data-source";
import workerRoutes from "./src/routes/workerRoutes";
import payrollRoutes from "./src/routes/payrollRoutes";
import cashAdvanceRoutes from "./src/routes/cashAdvanceRoutes";

const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON

const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};

// Register routes with the initialized data source
app.use("/api/workers", workerRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/cash-advances", cashAdvanceRoutes);

export { app, initializeDataSource };
