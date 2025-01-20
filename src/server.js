require("dotenv").config();
const chalk = require("chalk");
const boxen = require("boxen");
const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  const message = `
${chalk.cyan.bold("Nether API")}
${chalk.green("Server is running successfully!")}
${chalk.white("Listening on:")} ${chalk.yellow(`http://localhost:${port}`)}
  `;

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderColor: "green",
      borderStyle: "round",
    })
  );
});
