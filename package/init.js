const { program } = require("commander")
const chalk = require("chalk")
const boxen = require("boxen")
const COLORS = require("./utils/color")

program.version(require("../package.json").version)

const usage = chalk.keyword("blue")(
  "\n" +
    boxen(chalk.white("✨ leyoonafr" + "\n"), {
      padding: 1,
      borderColor: "white",
      dimBorder: true,
      borderStyle: "round",
    })
)

program.usage(usage)

program
  .command("create [name]")
  .description("create project template")
  .action(require("./command/create"))

program
  .command("inject [name]")
  .description("inject plugin")
  .action(require("./command/inject"))

program.parse(process.argv)
