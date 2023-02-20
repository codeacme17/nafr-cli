const inquirer = require("inquirer")
const chalk = require("chalk")
const COLORS = require("../utils/color")

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

const framework = () => {
  return inquirer.prompt([
    {
      name: "FRAMEWORK",
      type: "list",
      message: "Which framework do you use ?",
      choices: ["Vue", "React"],
    },
  ])
}

const injectQuestions = {
  pluginName,
  framework,
}

module.exports = injectQuestions
