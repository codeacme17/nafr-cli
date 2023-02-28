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
const generateCfonts = require("../package/utils/generate-cfonts")

program.version(require("../package.json").version)

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
  .option("-h", "--history <event>", "handle chat history")
  .action(() => {
    require("../package/command/chat")(process.argv.slice(3))
  })

generateCfonts()

program.parse(process.argv)
