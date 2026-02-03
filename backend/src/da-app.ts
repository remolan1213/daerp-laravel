import cors from "cors";
import express from "express";
import AppDataSource from "./data-source";
import workerRoutes from "./routes/workerRoutes";
import payrollRoutes from "./routes/payrollRoutes";
import { getPayrollSummary } from "./controllers/PayrollController";

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
app.get("/api/payroll", getPayrollSummary);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/docs", (_req, res) => {
  res.json({
    name: "DAERP API",
    version: "1.0",
    endpoints: [
      { method: "GET", path: "/api/health", description: "Health check" },
      { method: "GET", path: "/api/docs", description: "API summary" },
      { method: "GET", path: "/api/workers", description: "List workers (supports ?page=&limit=&name=)" },
      { method: "POST", path: "/api/workers", description: "Create worker" },
      { method: "GET", path: "/api/workers/:idNumber", description: "Get worker by ID number" },
      { method: "GET", path: "/api/workers/search?name=", description: "Search workers by name" },
      { method: "GET", path: "/api/payrolls", description: "List payrolls (supports ?page=&limit=&workerId=)" },
      { method: "POST", path: "/api/payrolls", description: "Create payroll" },
      { method: "GET", path: "/api/payrolls/:id", description: "Get payroll by ID" },
      { method: "PUT", path: "/api/payrolls/:id", description: "Update payroll" },
      { method: "DELETE", path: "/api/payrolls/:id", description: "Delete payroll" },
      { method: "GET", path: "/api/payroll", description: "Latest payroll summary for UI" },
    ],
  });
});

export { app, initializeDataSource };
