const repl = require("repl")
const chalk = require("chalk")

const KEY = require("../../KEY.json").OPENAI_API
const Load = require("../utils/Load")
const { COLORS } = require("../utils/config")
const { clear, log } = require("../utils/log")

/** need add:
    
    1. nafr chat [arguments]: the arguments will invoke different event handlers
        -h { history }: show the content from history file to the terminal 
        -c { continue }: use it can continue the previous conversation <may be not add>

    2. chat history: it will be a log file to remain the chat history stack

    3. nafr chat -h [command]: 
        - clear: clear the history file content

    4. add a handler to read file content and send the content to chatGPT 
    
  */

const load = new Load()

module.exports = () => {
  clear()
  startChatLog()
  startREPL()
}

function startREPL() {
  repl.start({
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")}`,
    eval: eval,
    writer: answerWriter,
  })
}

async function eval(cmd, context, filename, cb) {
  if (load.loading) return
  load.start()
  const res = await dummyOutPut(cmd)
  load.end()
  cb(null, res)
}

function answerWriter(output) {
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}${output}`
}

function startChatLog() {
  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH CHATGPT HERE...")}`)
  log()
}

function dummyOutPut(cmd) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cmd)
    }, 2000)
  })
}
