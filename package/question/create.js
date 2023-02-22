const inquirer = require("inquirer")
const chalk = require("chalk")

const filename = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "Project name ?",
      default: "nafr-project",
    },
  ]
  return inquirer.prompt(questions)
}

const creativeQuestions = {
  filename,
}

module.exports = creativeQuestions
