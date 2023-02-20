const shell = require("shelljs")
const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
const COLORS = require("../utils/color")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")

shell.config.fatal = true

const axios = (framework) => {
  const targetDir = getPluginDir()
  const sourceDir = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )
  shell.cp("-R", sourceDir, targetDir)
  install.axios(targetDir)
}

const tailwindcss = () => {
  const targetDir = getPluginDir()

  if (!checkHasDependencies("vite", "devDep"))
    return console.error(
      `${chalk.hex(COLORS.RED)(
        "ERROR"
      )}: tailwindCSS is only support to '${chalk.hex(COLORS.YELLOW)(
        "vite"
      )}' project`
    )

  if (checkHasDependencies("vue", "dep")) {
    console.log("vue project")
  }

  if (checkHasDependencies("react", "dep")) {
    console.log("react project")
  }
}

const plugin = {
  axios,
  tailwindcss,
}

module.exports = plugin

function getPluginDir() {
  if (fs.existsSync(path.resolve(".", "./src/plugin")))
    return path.resolve(".", "./src/plugin")

  if (fs.existsSync(path.resolve(".", "./src/plugins")))
    return path.resolve(".", "./src/plugins")

  shell.mkdir("-p", path.resolve(".", "./src/plugin"))
  return path.resolve(".", "./src/plugin")
}
