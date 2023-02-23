const shell = require("shelljs")
const path = require("path")
const chalk = require("chalk")

const { SOURCE_PROJECT } = require("../utils/path")
const { log } = require("../utils/log")

shell.config.fatal = true

function vue(TARGET_DIR, name) {
  startCreateLog(name)
  shell.mkdir("-p", TARGET_DIR)
  shell.cp("-R", SOURCE_PROJECT.vue, TARGET_DIR)
}

module.exports = {
  vue,
}

function startCreateLog(prject) {
  log()
  log(`📦  Creating ${chalk.cyan(prject)}...`)
  log()
}
