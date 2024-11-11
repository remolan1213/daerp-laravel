const { app, initializeDataSource } = require("./da-app"); // Import the existing Express app
require("dotenv").config(); // For loading environment variables

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
