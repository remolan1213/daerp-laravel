import { app, initializeDataSource } from "./da-app.js"; // Import the existing Express app
import dotenv from "dotenv"; // For loading environment variables

dotenv.config();

const port = process.env.DA_PORT || 4000; // Set your preferred backend port

//Initialize the database connection
initializeDataSource()
.then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error("Error during Data Source initialization:", error);
});
