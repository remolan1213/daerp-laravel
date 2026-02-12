import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./modules/auth/auth.routes";
import employeeRoutes from "./modules/employees/employee.routes";
import attendanceRoutes from "./modules/attendance/attendance.routes";
import payrollRoutes from "./modules/payroll/payroll.routes";
import periodRoutes from "./modules/periods/period.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import { errorHandler } from "./core/error-handler";
import { HttpError } from "./core/http";
import { env } from "./config/env";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.CORS_ORIGIN_LIST.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "daerp-backend" });
});

app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/periods", periodRoutes);
app.use("/payroll", payrollRoutes);
app.use("/analytics", analyticsRoutes);

app.use((_req, _res, next) => {
  next(new HttpError(404, "Route not found"));
});

app.use(errorHandler);
