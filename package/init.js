const { program } = require("commander")
const chalk = require("chalk")
const boxen = require("boxen")
const COLORS = require("./utils/color")

program.version(require("../package.json").version)

const usage = chalk.keyword("blue")(
  "\n" +
    boxen(
      chalk.white(
        "✨ Create project template with vue" + "\n",
        chalk.hex(COLORS.YELLOW)(
          chalk.bold("\n" + "> $ qyf-cli create [project-name]" + "\n")
        ),
        "\n",
        chalk.dim("\n" + "🧡 From Qingdao frontend development")
      ),
      {
        padding: 1,
        borderColor: "white",
        dimBorder: true,
        borderStyle: "round",
      }
    )
)

program
  .usage(usage)
  .command("create [name]")
  .description("create project template")
  .action(require("./commands/create"))

program.parse(process.argv)
