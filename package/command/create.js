const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const boxen = require("boxen")

const create = require("../handler/create-preject")
const creativeQuestions = require("../question/create")
const { COLORS } = require("../utils/config")
const { log, clear, error, success } = require("../utils/log")
const { TARGET } = require("../utils/path")

module.exports = async (name) => {
  clear()

  name = name || (await setPrjectName(name))

  const TARGET_DIR = path.resolve(TARGET.root, name)

  if (fs.existsSync(TARGET_DIR))
    return error(
      `there already was dir called ${chalk.hex(COLORS.YELLOW)(
        name
      )}, please change the project name`
    )

  const framework = await setFramework()

  create[framework](TARGET_DIR, name)

  successLog(name)
}

async function setPrjectName() {
  const creativeAnswers = await creativeQuestions.filename()
  return creativeAnswers.FILENAME
}

async function setFramework() {
  const answer = await creativeQuestions.framework()
  return answer.FRAMEWORK
}

function successLog(name) {
  success(`Successfully created ${chalk.hex(COLORS.GREEN)(name)}`)
  log(`   ${chalk.hex(COLORS.YELLOW)("cd")} ${name}`)
  log()
  log(`   ${chalk.hex(COLORS.YELLOW)("pnpm")} install`)
  log()
}
