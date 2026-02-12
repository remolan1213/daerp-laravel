import cors from "cors";
import express from "express";
import AppDataSource from "./data-source.js";
import workerRoutes from "./routes/workerRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";
import cashAdvanceRoutes from "./routes/cashAdvanceRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON
const initializeDataSource = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected!");
    }
    catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
};
// Register routes with the initialized data source
app.use("/api/workers", workerRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/cash-advances", cashAdvanceRoutes);
app.use("/api/bank-accounts", bankRoutes);
export { app, initializeDataSource };
