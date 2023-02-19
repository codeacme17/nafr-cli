const shell = require("shelljs")
const path = require("path")
const { existsSync, mkdir } = require("fs")

shell.config.fatal = true

const axios = (framework) => {
  const cwd = process.cwd()
  const targetDir = getPluginDir(cwd)
  const sourceDir = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )

  if (!targetDir) {
    mkdir(path.resolve(cwd, "./src/plugin"))
    targetDir = getPluginDir(cwd)
  }

  shell.cp("-R", sourceDir, targetDir)
  shell.exec("npm install axios")
}

const tailwindCSS = (targetDir, framework) => {}

const plugin = {
  axios,
  tailwindCSS,
}

module.exports = plugin

function getPluginDir(cwd) {
  if (existsSync(path.resolve(cwd, "./src/plugin")))
    return path.resolve(cwd, "./src/plugin")

  if (existsSync(path.resolve(cwd, "./src/plugins")))
    return path.resolve(cwd, "./src/plugins")

  return ""
}
