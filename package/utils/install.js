const { detect } = require("detect-package-manager")
const chalk = require("chalk")
const shell = require("shelljs")

const { COLORS } = require("../utils/config")
const { log, success } = require("../utils/log")

shell.config.fatal = true

async function axios() {
  await detectBin("axios", "")
  successInstallLog("axios")
}

async function tailwindcss() {
  await detectBin("tailwindcss postcss autoprefixer", "-D")
  successInstallLog("tailwindCSS")
}

async function eslint(framework) {
  if (framework === "vue")
    await detectBin(
      "@vue/eslint-config-prettier @vue/eslint-config-typescript @vue/tsconfig eslint eslint-plugin-vue prettier",
      "-D"
    )

  successInstallLog("eslint & prettier")
}

module.exports = {
  axios,
  tailwindcss,
  eslint,
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
  log()
  success(`Successfully installed plugin: ${chalk.hex(COLORS.YELLOW)(plugin)}`)
}
