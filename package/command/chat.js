const repl = require("repl")
const chalk = require("chalk")

const Load = require("../utils/Load")
const History = require("../utils/History")
const { COLORS } = require("../utils/config")
const { clear, log, error } = require("../utils/log")
const { generateChat } = require("../utils/api")

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
history.init()

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
    prompt: `${chalk.hex(COLORS.GREEN)("Question: ")} \n`,
    eval: eval,
    writer: answerWriter,
  })
}

async function eval(cmd, context, filename, cb) {
  const formatedCmd = formatCmd(cmd)

  chatCommand(formatedCmd)

  if (!formatedCmd || load.loading) return

  history.write(formatedCmd, "qusetion")
  const res = await dummyOutPut(formatedCmd)
  cb(null, res)
}

function answerWriter(output) {
  history.write(output, "answer")
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${output}\n`
}

function startChatLog() {
  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH CHATGPT HERE...")}`)
  log()
}

async function dummyOutPut(cmd) {
  load.start()
  const res = await generateChat(cmd)
  load.end()
  return res
}

function formatCmd(cmd) {
  const index = cmd.lastIndexOf("\n")
  return cmd.substring(0, index)
}

function chatCommand(cmd) {
  switch (cmd) {
    case "/":
      process.exit(1)

    default:
      break
  }
}
