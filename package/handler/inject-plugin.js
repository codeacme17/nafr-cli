const shell = require("shelljs")
const path = require("path")
const fs = require("fs")
const install = require("../utils/install")

shell.config.fatal = true

const axios = (framework) => {
  const sourceDir = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )

  let targetDir = getPluginDir()

  if (!targetDir) {
    shell.mkdir("-p", path.resolve(".", "./src/plugin"))
    targetDir = getPluginDir()
  }

  shell.cp("-R", sourceDir, targetDir)
  install.axios(targetDir)
}

const tailwindCSS = (targetDir, framework) => {}

const plugin = {
  axios,
  tailwindCSS,
}

module.exports = plugin

function getPluginDir() {
  if (fs.existsSync(path.resolve(".", "./src/plugin")))
    return path.resolve(".", "./src/plugin")

  if (fs.existsSync(path.resolve(".", "./src/plugins")))
    return path.resolve(".", "./src/plugins")

  return ""
}
