const mysql = require("mysql2/promise");
const logger = require("./logger");
require("dotenv").config();

class MySQL {
  constructor(uri) {
    this.uri = uri;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        uri: this.uri,
      });
    } catch (error) {
      logger.error(`MySQL connection failed: (${error.message})`);
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      this.connection.end();
      logger.info("Disconnected from MySQL database.");
    } catch (error) {
      logger.error(`MySQL disconnection failed: (${error.message})`);
      process.exit(1);
    }
  }
}

module.exports = new MySQL(process.env.MYSQL_URI);
