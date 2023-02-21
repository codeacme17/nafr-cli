const inquirer = require("inquirer")
const chalk = require("chalk")

const pluginName = () => {
  return inquirer.prompt([
    {
      name: "PLUGINNAME",
      type: "list",
      message: "Which plugin do you want to insert ?",
      choices: ["axios", "tailwindCSS", "eslint"],
    },
  ])
}

const injectQuestions = {
  pluginName,
}

module.exports = injectQuestions
