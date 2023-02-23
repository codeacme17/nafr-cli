const shell = require("shelljs")
const chalk = require("chalk")

const { SOURCE_PROJECT } = require("../utils/path")
const { log, success } = require("../utils/log")
const { COLORS } = require("../utils/config")

shell.config.fatal = true

function vue(TARGET_DIR, project) {
  startCreateLog(project)

  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.vue, TARGET_DIR)

  successLog(project)
}

function react(TARGET_DIR, project) {
  startCreateLog(project)

  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.react, TARGET_DIR)

  successLog(project)
}

module.exports = {
  vue,
  react,
}

function startCreateLog(prject) {
  log()
  log(`📦  Creating ${chalk.cyan(prject)}...`)
  log()
}

function successLog(name) {
  success(`Successfully created ${chalk.hex(COLORS.GREEN)(name)}`)
  log(`   ${chalk.hex(COLORS.YELLOW)("cd")} ${name}`)
  log()
  log(`   ${chalk.hex(COLORS.YELLOW)("pnpm")} install`)
  log()
}
