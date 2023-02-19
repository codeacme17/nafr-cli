const inquirer = require("inquirer")
const chalk = require("chalk")
const COLORS = require("../utils/color")

const filename = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "Project name ?",
      default: "project-vue",
    },
  ]
  return inquirer.prompt(questions)
}

const creativeQuestions = {
  filename,
}

module.exports = creativeQuestions
