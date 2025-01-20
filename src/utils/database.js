const mongoose = require("mongoose");
const logger = require("../lib/logger");

class Database {
  constructor(uri) {
    this.uri = uri;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(this.uri, {
        useNewUrlParser: true,
      });

      logger.success(
        `Connected to database! (${this.connection.connection.host})`
      );

      this._addEventListeners();
    } catch (error) {
      logger.error(`Database connection failed: (${error.message})`);
      process.exit(1);
    }
  }

  _addEventListeners() {
    this.connection.connection.on("error", (error) => {
      logger.error(`Database error: ${error.message}`);
    });

    this.connection.connection.on("disconnected", () => {
      logger.warn("Database connection lost");
    });
  }

  async disconnect() {
    if (this.connection) {
      try {
        await mongoose.connection.close();
        logger.info("Database disconnected successfully");
      } catch (error) {
        logger.error(
          `Error while disconnecting from database: ${error.message}`
        );
      }
    } else {
      logger.warn("No database connection found");
    }
  }
}

module.exports = Database;
