#! /usr/bin/env node

const currentNodeVersion = process.versions.node
const major = currentNodeVersion.split(".")[0]

if (major < 10) {
  console.error(
    chalk.red(
      `You are running Node \n${currentNodeVersion} \nvue-assist-cli requires Node 10 or higher.\nPlease update your version of Node`
    )
  )
  process.exit(1)
}

const { program } = require("commander")
const chalk = require("chalk")
const boxen = require("boxen")
const { COLORS } = require("../package/utils/config")

program.version(require("../package.json").version)

const usage = chalk.keyword("blue")(
  "\n" +
    boxen(chalk.white("🎹 CLI for ") + chalk.hex(COLORS.YELLOW)("leyoonafr"), {
      padding: {
        top: 1,
        right: 5,
        bottom: 1,
        left: 5,
      },
      margin: {
        top: 1,
        left: 3,
      },
      borderColor: COLORS.YELLOW,
      dimBorder: true,
      borderStyle: "round",
    })
)

program.usage(usage)

program
  .command("create")
  .description("create project template")
  .argument("[name]", "the file name of this project")
  .action(require("../package/command/create"))

program
  .command("inject")
  .argument("[name]", "the name of plugin to inject")
  .description("inject plugin")
  .action(require("../package/command/inject"))

program
  .command("chat")
  .description("chat with chatGPT")
  .action(require("../package/command/chat"))

program.parse(process.argv)
