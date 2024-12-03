import cors from "cors";
import express from "express";
import AppDataSource from "./src/data-source.js";
import workerRoutes from "./src/routes/workerRoutes.js";
import payrollRoutes from "./src/routes/payrollRoutes.js";
import cashAdvanceRoutes from "./src/routes/cashAdvanceRoutes.js";

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
app.use("/api/workers", workerRoutes(AppDataSource));
app.use("/api/payrolls", payrollRoutes(AppDataSource));
app.use("/api/cash-advances", cashAdvanceRoutes(AppDataSource));

export { app, initializeDataSource };
