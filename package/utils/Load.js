const chalk = require("chalk")
const { COLORS } = require("../utils/config")

class Load {
  constructor() {
    this.stream = process.stderr
    this.loading = false
    this.frameIndex = 0
    this.ellipsisIndex = 0
    this.interval
  }

  start() {
    this.loading = true
    this.stream.write("\u001b[?25l")
    this.render()
  }

  end() {
    this.loading = false
    this.stream.clearLine()
    this.stream.cursorTo(0)
    this.stream.write("\u001b[?25h")
    clearInterval(this.interval)
  }

  loadContent() {
    const frames = [".", "o", "O", "°", "O", "o", "."]
    const frame = frames[this.frameIndex]
    const texts = [".", "..", "..."]
    const text = texts[this.ellipsisIndex]
    this.frameIndex = ++this.frameIndex % frames.length
    this.ellipsisIndex = ++this.ellipsisIndex % texts.length
    return (
      chalk.hex(COLORS.BLUE)(frame) +
      " " +
      chalk.hex(COLORS.GRAY)("chatGPT is writing" + text)
    )
  }

  render() {
    this.interval = setInterval(() => {
      this.stream.clearLine()
      this.stream.cursorTo(0)
      this.stream.write(this.loadContent())
    }, 300)
  }
}

module.exports = Load
