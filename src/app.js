require("dotenv").config();
const express = require("express");
const limiter = require("./middleware/ratelimit");
const logger = require("./utils/logger");
const authenticateToken = require("./middleware/auth");
const { errorHandler, notFoundHandler } = require("./middleware/error");
const healthRouter = require("./routes/health");
const database = require("./utils/database");
const mysql = require("./utils/mysql");
const usersRouter = require("./routes/users");

database.connect().then((connection) => {
  logger.success(
    `Connected to MongoDB database (${connection.connection.host})`
  );
});
mysql.connect().then(() => {
  logger.success("Connected to MySQL database");
});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(authenticateToken);

// health check
app.use("/health", healthRouter);
app.use("/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
