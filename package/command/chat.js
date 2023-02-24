const repl = require("repl")
const chalk = require("chalk")

const KEY = require("../../KEY.json").OPENAI_API
const Load = require("../utils/Load")
const History = require("../utils/History")
const { COLORS } = require("../utils/config")
const { clear, log, success, error } = require("../utils/log")

/** need add:
    
    1. nafr chat [arguments]: the arguments will invoke different event handlers
        -h { history }: show the content from history file to the terminal 
        -c { continue }: use it can continue the previous conversation <may be not add>

    2. chat history: it will be a log file to remain the chat history stack

    3. nafr chat -h [command]: 
        - read: read the history file content
        - clear: clear the history file content

    4. add a handler to read file content and send the content to chatGPT 

  */

NODE_REPL_HISTORY = ""

const load = new Load("chatGPT is writing...")
const history = new History()

module.exports = (name, options) => {
  if (options.length) {
    const [flag, event] = options
    switch (event) {
      case "read":
        process.stderr.write(history.read())
        break

      case "clear":
        history.clear()
        break

      default:
        error(`no handler called '${chalk.hex(COLORS.YELLOW)(event)}'`)
        break
    }
    return
  }
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
  history.write(cmd, "q")
  load.start()
  const res = await dummyOutPut(cmd)
  load.end()
  cb(null, res)
}

function answerWriter(output) {
  history.write(output, "a")
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
