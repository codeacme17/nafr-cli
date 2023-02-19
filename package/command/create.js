const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const boxen = require("boxen")

const creativeQuestions = require("../question/create")
const createTemplate = require("../handler/create-template")
const COLORS = require("../utils/color")

module.exports = async (fileName, cmdObj) => {
  console.clear()

  const targetFile = await setTargetFile(fileName)
  if (targetFile === "error") return
  fileName = targetFile.fileName
  targetDir = targetFile.targetDir

  console.clear()

  const version = await selectVersion()
  const css = await selectCSS()

  createTemplate(targetDir)

  successLog(fileName)
}

async function setTargetFile(fileName) {
  if (!fileName) {
    const creativeAnswers = await creativeQuestions.filename()
    fileName = creativeAnswers.FILENAME
  }
  const curDir = path.resolve(".")
  const targetDir = path.resolve(curDir, fileName)
  if (fs.existsSync(targetDir)) {
    console.error(
      chalk.hex(COLORS.RED)(
        `🚨 当前目录下已存在 ‘${fileName}’ 文件夹，请更换项目名称`
      )
    )
    return Promise.resolve("error")
  }
  return Promise.resolve({
    fileName,
    targetDir,
  })
}

async function selectVersion() {
  const versionAnswers = await creativeQuestions.version()
  version = versionAnswers.VERSION
  return Promise.resolve(version)
}

async function selectCSS() {
  const cssAnswers = await creativeQuestions.css()
  css = cssAnswers.CSS
  return Promise.resolve(css)
}

function successLog(fileName) {
  console.log(
    boxen(
      chalk.white(
        chalk.hex(COLORS.GREEN)("🎉 创建成功！" + "\n"),
        chalk.hex(COLORS.YELLOW)(
          chalk.bold("\n" + `> $ cd ${fileName}` + "\n"),
          chalk.bold("\n" + `> $ npm install` + "\n")
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
}
