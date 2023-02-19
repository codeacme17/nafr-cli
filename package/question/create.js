const inquirer = require("inquirer")
const chalk = require("chalk")
const COLORS = require("../utils/color")

const filename = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message:
        "你未输入项目名称，你可以在这输入一个项目名（默认为‘project-vue’）",
      default: "project-vue",
    },
  ]
  return inquirer.prompt(questions)
}

const version = () => {
  const questions = [
    {
      name: "VERSION",
      type: "list",
      message: `请选择你要使用的 ${chalk.hex(COLORS.GREEN)("Vue")} 版本`,
      choices: ["Vue@2.x", "Vue@3.x", "Vue@3.x + Typescript"],
    },
  ]
  return inquirer.prompt(questions)
}

const css = () => {
  const questions = [
    {
      name: "CSS",
      type: "list",
      message: `请选择你要使用的 ${chalk.hex(COLORS.RED)("CSS")} 编译器`,
      choices: ["none", "Sass", "Less"],
    },
  ]
  return inquirer.prompt(questions)
}

const creativeQuestions = {
  filename,
  version,
  css,
}

module.exports = creativeQuestions
