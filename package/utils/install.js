const { spawn, exec } = require("child_process")
const { detect } = require("detect-package-manager")

const chalk = require("chalk")
const COLORS = require("../utils/color")

async function axios(targetDir) {
  const { pm, bin } = await detectBin("axios", "")

  bin.on("close", () => {
    successLog("axios", targetDir)
  })
}

async function tailwindcss(targetDir) {
  const { pm, bin } = await detectBin("tailwindcss postcss autoprefixer", "-D")
  const [targetSrcDir, targetRootDir] = targetDir

  bin.on("close", () => {
    ;[targetSrcDir, targetRootDir].forEach((dir) => {
      successLog("tailwindcss", dir)
    })
  })
}

module.exports = {
  axios,
  tailwindcss,
}

async function detectBin(plugin, params) {
  const pm = await detect()
  let bin

  switch (pm) {
    case "npm":
      exec(`npm i ${params} ${plugin}`)
      bin = spawn("npm", ["i"])
      break

    case "pnpm":
      exec(`pnpm i ${params} ${plugin}`)
      bin = spawn("pnpm", ["i"])
      break

    case "yarn":
      exec(`yarn add ${params} ${plugin}`)
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
