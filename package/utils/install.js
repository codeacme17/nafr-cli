const { spawn, exec } = require("child_process")
const shell = require("shelljs")

function axios() {
  exec("npm i axios")
  const npm = spawn("npm", ["i"])

  npm.stdout.on("data", (data) => {
    console.log(data)
  })

  npm.stderr.on("data", (error) => {
    console.error(`npm install error: ${error}`)
  })

  npm.on("close", (code) => {
    if (code === 0) console.log(`inject axios success !`)
  })
}

module.exports = {
  axios,
}
