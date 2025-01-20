const Database = require("../utils/database");

module.exports = new Database(process.env.MONGO_URI);
