const repl = require("repl")
const chalk = require("chalk")

const Load = require("../utils/Load")
const History = require("../utils/History")
const { COLORS } = require("../utils/config")
const { clear, log, error } = require("../utils/log")
const { chat, explainCode } = require("../utils/api")

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
  const commendType = chatCommand(formatedCmd)

  if (!formatedCmd || load.loading) return
  const res = await requestOpenai(formatedCmd, commendType)
  history.write(formatedCmd, "qusetion")
  cb(null, res)
}

function answerWriter(output) {
  history.write(output, "answer")
  return `${chalk.hex(COLORS.YELLOW)("Answer: ")}\n${output}\n`
}

function formatCmd(cmd) {
  const index = cmd.lastIndexOf("\n")
  return cmd.substring(0, index)
}

function chatCommand(cmd) {
  if (cmd === "/") process.exit(1)
  if (/^\/code/.test(cmd)) return "code"
}

async function requestOpenai(cmd, type) {
  load.start()
  let res
  switch (type) {
    case "code":
      res = await explainCode(cmd.substring(5))
      break

    default:
      res = await chat(cmd)
      break
  }
  load.end()
  return res
}

function startChatLog() {
  log()
  log(`${chalk.hex(COLORS.PURPLE)("🤖 CHAT WITH CHATGPT HERE...")}`)
  log()
}
