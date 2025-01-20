require("dotenv").config();
const express = require("express");
const limiter = require("./middleware/ratelimit");
const authenticateToken = require("./middleware/auth");
const { errorHandler, notFoundHandler } = require("./middleware/error");
const healthRouter = require("./routes/health");
const database = require("./lib/database");

database.connect(process.env.MONGO_URI);

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(authenticateToken);

// health check
app.use("/health", healthRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
