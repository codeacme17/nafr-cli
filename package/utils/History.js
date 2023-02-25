const path = require("path")
const fs = require("fs")
const shell = require("shelljs")

const { log, success, warn } = require("../utils/log")

class History {
  constructor() {
    this.HISTROTY_PATH = ""
    this.content = ""
  }

  init() {
    const HISTROTY_PATH = path.resolve(__dirname, "../../chat_history.txt")
    if (!fs.existsSync(HISTROTY_PATH)) shell.touch(HISTROTY_PATH)
    this.HISTROTY_PATH = HISTROTY_PATH
    this.content = fs.readFileSync(this.HISTROTY_PATH, { encoding: "utf-8" })
  }

  read() {
    if (!this.checkHasContent()) return ""
    return this.content
  }

  write(content, type) {
    const date = new Date()

    content = `${
      type === "QUESTION" ? `\n${date}\n` : ""
    } \n  ${type}: ${content}`

    fs.appendFile(this.HISTROTY_PATH, content, (err) => {})
  }

  clear() {
    if (!this.checkHasContent()) return ""
    fs.writeFile(this.HISTROTY_PATH, "", (err) => {})
    log()
    success("Successfully cleared history file content")
  }

  checkHasContent() {
    if (this.content) return true
    warn("There is no content in the history file")
    return false
  }
}

module.exports = History
