const chalk = require("chalk");

class Logger {
  constructor() {
    this.logger = console;
  }

  success(message) {
    this.logger.log(chalk.green.bold(`✔ ${message}`));
  }

  error(message) {
    this.logger.log(chalk.red.bold(`✖ ${message}`));
  }

  info(message) {
    this.logger.log(chalk.blue.bold(`[INFO] ${message}`));
  }

  warn(message) {
    this.logger.log(chalk.yellow.bold(`[WARNING] ${message}`));
  }

  debug(message) {
    this.logger.log(chalk.cyan.bold(`[DEBUG] ${message}`));
  }
}

module.exports = new Logger();
