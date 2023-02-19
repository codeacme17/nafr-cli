const shell = require("shelljs")
const path = require("path")
const fs = require("fs")
const install = require("../utils/install")

shell.config.fatal = true

const axios = (framework) => {
  const cwd = process.cwd()
  const targetDir = getPluginDir(cwd)
  const sourceDir = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )

  if (!targetDir) {
    fs.mkdir(path.resolve(cwd, "./src/plugin"))
    targetDir = getPluginDir(cwd)
  }
  shell.cp("-R", sourceDir, targetDir)
  install.axios()
}

const tailwindCSS = (targetDir, framework) => {}

const plugin = {
  axios,
  tailwindCSS,
}

module.exports = plugin

function getPluginDir(cwd) {
  if (fs.existsSync(path.resolve(cwd, "./src/plugin")))
    return path.resolve(cwd, "./src/plugin")

  if (fs.existsSync(path.resolve(cwd, "./src/plugins")))
    return path.resolve(cwd, "./src/plugins")

  return ""
}
