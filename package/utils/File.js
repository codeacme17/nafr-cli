const fs = require("fs")
const chalk = require("chalk")

const { COLORS } = require("./config")
const { success, error } = require("./log")

class File {
  constructor(TARGET_FILE_PATH) {
    this.TARGET_FILE_PATH = TARGET_FILE_PATH
    this.fileContents = fs.readFileSync(this.TARGET_FILE_PATH, "utf-8")
  }

  write(content) {
    const { TARGET_FILE_PATH, fileContents, match } = this
    if (this.hasProperty("proxy")) return

    const configObj = match[1].trim()
    const insertIndex = fileContents.indexOf(configObj) + configObj.length - 1
    const result =
      fileContents.slice(0, insertIndex) +
      `${content}\n` +
      fileContents.slice(insertIndex)

    fs.writeFile(TARGET_FILE_PATH, result, "utf8", (err) => {
      if (err) return error(err)
      success(
        `Successfully updated file: ${chalk.hex(COLORS.PURPLE)(
          this.TARGET_FILE_PATH
        )}`
      )
    })
  }

  get match() {
    const { fileContents } = this
    const match = /export default defineConfig\((\{[\s\S]*?\})\)/.exec(
      fileContents
    )
    if (!match)
      return error("Could not find the position to insert the new code")

    return match
  }

  hasProperty(property) {
    const index = this.fileContents.indexOf(property)
    return index !== -1
  }
}

module.exports = File
