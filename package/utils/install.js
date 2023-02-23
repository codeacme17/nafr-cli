const { detect } = require("detect-package-manager")
const chalk = require("chalk")
const shell = require("shelljs")

const { COLORS } = require("../utils/config")

shell.config.fatal = true

async function axios() {
  await detectBin("axios", "")
  successInstallLog("axios")
}

async function tailwindcss() {
  await detectBin("tailwindcss postcss autoprefixer", "-D")
  successInstallLog("tailwindCSS")
}

module.exports = {
  axios,
  tailwindcss,
}

async function detectBin(plugin, params) {
  const pm = await detect()

  switch (pm) {
    case "npm":
      shell.exec(`npm i ${params} ${plugin}`)
      break
    case "pnpm":
      shell.exec(`pnpm i ${params} ${plugin}`)
      break
    case "yarn":
      shell.exec(`yarn add ${params} ${plugin}`)
      break
  }
}

function successInstallLog(plugin) {
  console.log()
  console.log(
    `${chalk.hex(COLORS.GREEN)(
      "✔"
    )}  Successfully installed plugin: ${chalk.hex(COLORS.YELLOW)(plugin)}`
  )
  console.log()
}
