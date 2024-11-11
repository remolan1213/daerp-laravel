// src/data-source.js
const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data/db.sqlite",
  synchronize: false,         // Disable sync if using migrations
  entities: ["src/entity/*.js"],
  migrations: ["src/migrations/*.js"],
});

module.exports = AppDataSource;
