const fs = require("fs")

class FileStream {
  constructor(TARGET_FILE_PATH) {
    this.TARGET_FILE_PATH = TARGET_FILE_PATH
    this.readStream = fs.createReadStream(this.TARGET_FILE_PATH, {
      encoding: "utf-8",
    })
    this.fielContentCache = ""
  }

  get fileContent() {
    return new Promise((resolve) => {
      this.readStream.on("data", (data) => {
        this.fielContentCache = data
        resolve(data)
      })
    })
  }

  async getLastIndex(str) {
    const c = this.fielContentCache || (await this.fileContent)
    return c.lastIndexOf(str)
  }

  async write(content) {
    if ((await this.getLastIndex("proxy")) !== -1) return
    const start = await this.getLastIndex("})")
    const writeStream = fs.createWriteStream(this.TARGET_FILE_PATH, {
      flags: "r+",
      start,
    })
    writeStream.write(content)
  }
}

module.exports = FileStream
