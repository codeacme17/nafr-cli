const inquirer = require("inquirer")

const { PLUGIN } = require("../utils/config")

const pluginName = () => {
  return inquirer.prompt([
    {
      name: "PLUGINNAME",
      type: "list",
      message: "Which plugin do you want to inject ?",
      choices: PLUGIN,
    },
  ])
}

const injectQuestions = {
  pluginName,
}

module.exports = injectQuestions
