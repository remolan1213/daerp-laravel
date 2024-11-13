const cors = require('cors');
const express = require("express");
const { DataSource } = require("typeorm");
const app = express();
const workerRoutes = require("./src/routes/workerRoutes");
const payrollRoutes = require("./src/routes/payrollRoutes");

app.use(cors()); 
// Middleware to parse JSON request bodies
app.use(express.json());  // This will automatically parse incoming JSON

// Initialize the database connection
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data/db.sqlite",
  entities: [require("./src/entity/Worker"), require("./src/entity/Payroll")],
  logging: false,
});

const initializeDataSource = async () => {
 try {
   await AppDataSource.initialize();
   console.log("Database connected!!");
 } catch (error) {
   console.error("Error during Data Source initialization:", error);
 }
};
// Register routes
app.use('/api/workers', workerRoutes(AppDataSource));
app.use('/api/payrolls', payrollRoutes(AppDataSource));
// Export AppDataSource so it can be used in the controller
module.exports = { app, AppDataSource, initializeDataSource };
