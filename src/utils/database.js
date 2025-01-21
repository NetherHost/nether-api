const mongoose = require("mongoose");
const logger = require("./logger");

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

      this._addEventListeners();

      return this.connection;
    } catch (error) {
      logger.error(`MongoDB connection failed: (${error.message})`);
      process.exit(1);
    }
  }

  _addEventListeners() {
    this.connection.connection.on("error", (error) => {
      logger.error(`MongoDB error: ${error.message}`);
    });

    this.connection.connection.on("disconnected", () => {
      logger.warn("MongoDB connection lost");
    });
  }

  async disconnect() {
    if (this.connection) {
      try {
        await mongoose.connection.close();
      } catch (error) {
        logger.error(
          `Error while disconnecting from MongoDB: ${error.message}`
        );
      }
    } else {
      logger.warn("No MongoDB connection found");
    }
  }
}

module.exports = new Database(process.env.MONGO_URI);
