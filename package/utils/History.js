const path = require("path")
const fs = require("fs")

const { log, success } = require("../utils/log")

class History {
  constructor() {
    this.HISTROTY_PATH = path.resolve(__dirname, "../../chat_history.txt")
    this.content = fs.readFileSync(this.HISTROTY_PATH, { encoding: "utf-8" })
  }

  read() {
    if (!this.checkHasContent()) return ""
    return this.content
  }

  write(content, type) {
    const date = new Date()

    content = `${type === "q" ? date : ""}
               ${type}: ${content}`

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
    log()
    log("there is no content in the history file")
    log()
    return false
  }
}

module.exports = History
