import { app, initializeDataSource } from "./da-app"; // Import the existing Express app
import dotenv from "dotenv"; // For loading environment variables

dotenv.config();

const port: number = parseInt(process.env.DA_PORT as string, 10) || 4000; // Set your preferred backend port

//Initialize the database connection
initializeDataSource()
.then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((error: Error) => {
  console.error("Error during Data Source initialization:", error);
});
