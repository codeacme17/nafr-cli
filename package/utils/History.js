const path = require("path")
const fs = require("fs")

class History {
  constructor() {
    this.HISTROTY_PATH = path.resolve(__dirname, "../../chat_history.txt")
  }

  read() {
    return fs.readFileSync(this.HISTROTY_PATH, { encoding: "utf-8" })
  }

  write(content, type) {
    const date = new Date()

    content = `${type === "q" ? date : ""}
               ${type}: ${content}`

    fs.appendFile(this.HISTROTY_PATH, content, (err) => {})
  }

  clear() {
    fs.writeFile(this.HISTROTY_PATH, "", (err) => {})
  }
}

module.exports = History
