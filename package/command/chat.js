const repl = require("repl")
const chalk = require("chalk")

const KEY = require("../../KEY.json").OPENAI_API
const { COLORS } = require("../utils/config")
const { clear, log } = require("../utils/log")

/** need add:
    1. nafr chat [arguments]: the arguments will invoke different event handlers
        -h: history 
        -c: continue

    2. chat history: it will be a log file to remain the chat history stack
    3. continue: "-c" argument, use it can continue the previous conversation
  */

module.exports = () => {
  clear()

  startChat()

  repl.start({
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")}`,
    eval: eval,
    writer: answerWriter,
  })
}

function eval(cmd, context, filename, cb) {
  console.log(cmd == "clear/n")
  if (cmd === "/") log("2")
  cb(null, cmd)
}

function answerWriter(output) {
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}${output}`
}

function startChat() {
  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH CHATGPT HERE...")}`)
  log()
}
