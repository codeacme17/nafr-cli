const inquirer = require("inquirer")

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
