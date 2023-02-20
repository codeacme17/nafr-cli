const { spawn, exec } = require("child_process")
const { detect } = require("detect-package-manager")

const chalk = require("chalk")
const COLORS = require("../utils/color")

async function axios(targetDir) {
  const { pm, bin } = await detectBin("axios")

  bin.on("close", () => {
    successLog("axios", targetDir)
  })
}

module.exports = {
  axios,
}

async function detectBin(plugin) {
  const pm = await detect()
  let bin

  switch (pm) {
    case "npm":
      exec(`npm i ${plugin}`)
      bin = spawn("npm", ["i"])
      break

    case "pnpm":
      exec(`pnpm i ${plugin}`)
      bin = spawn("pnpm", ["i"])
      break

    case "yarn":
      exec(`yarn add ${plugin}`)
      bin = spawn("yarn", ["add"])
      break

    default:
      break
  }

  return {
    pm,
    bin,
  }
}

function successLog(plugin, targetDir) {
  console.log(
    `${chalk.hex(COLORS.GREEN)("✔")}  Successfully injected plugin: ${chalk.hex(
      COLORS.YELLOW
    )(plugin)}`
  )
  console.log(
    `${chalk.hex(COLORS.GREEN)("✔")}  Successfully injected file: ${chalk.hex(
      COLORS.YELLOW
    )(targetDir + "/axios.js")}`
  )
  console.log()
}
