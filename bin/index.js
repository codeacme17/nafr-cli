#! /usr/bin/env node

const currentNodeVersion = process.versions.node
const major = currentNodeVersion.split(".")[0]

if (major < 10) {
  console.error(
    chalk.red(
      `You are running Node \n${currentNodeVersion} \nvue-assist-cli requires Node 10 or higher.\nPlease update your version of Node`
    )
  )
  process.exit(1)
}

require("../package/init")
