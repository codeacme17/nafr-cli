const shell = require("shelljs")
const path = require("path")
shell.config.fatal = true

const createTemplate = (targetDir) => {
  let sourceDir, destFile
  shell.mkdir("-p", targetDir)
  sourceDir = path.resolve(__dirname, `../../template/*`)
  shell.cp("-R", sourceDir, targetDir)
  destFile = path.resolve(targetDir, "index.vue")
  return { sourceDir, destFile }
}

module.exports = createTemplate
