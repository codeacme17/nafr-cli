const shell = require("shelljs")
const path = require("path")
shell.config.fatal = true

const createProject = (targetDir) => {
  const sourceDir = path.resolve(__dirname, `../../template/*`)
  let destFile
  shell.mkdir("-p", targetDir)
  shell.cp("-R", sourceDir, targetDir)
  destFile = path.resolve(targetDir, "index.vue")
  return { sourceDir, destFile }
}

module.exports = createProject
