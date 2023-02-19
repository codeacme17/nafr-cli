const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const boxen = require("boxen")

const questions = require("../question/inject")
const injectPlugin = require("../handler/inject-plugin")
const COLORS = require("../utils/color")
const PLUGIN = require("../utils/plugin")

module.exports = async (pluginName) => {
  console.clear()

  pluginName = pluginName || (await choseInjectPlugin())
  pluginName = checkPluginNameValid(pluginName)
  if (!pluginName) return

  const framework = await choseFramework()

  injectPlugin[pluginName](framework)
}

async function choseInjectPlugin() {
  const answers = await questions.pluginName()
  const pluginName = answers.PLUGINNAME
  return Promise.resolve(pluginName)
}

async function choseFramework() {
  const answers = await questions.framework()
  const framework = answers.FRAMEWORK
  return Promise.resolve(framework)
}

function checkPluginNameValid(pluginName) {
  const pluginNameLower = pluginName.toLowerCase()
  if (PLUGIN.indexOf(pluginNameLower) === -1)
    return console.error(
      `Can not find plugin called '${chalk.hex(COLORS.YELLOW)(pluginName)}'`
    )
  else return pluginNameLower
}

function successLog(fileName) {
  console.log(
    boxen(
      chalk.white(
        chalk.hex(COLORS.GREEN)("🎉 创建成功！" + "\n"),
        chalk.hex(COLORS.YELLOW)(
          chalk.bold("\n" + `> $ cd ${fileName}` + "\n"),
          chalk.bold("\n" + `> $ npm install` + "\n")
        ),
        "\n",
        chalk.dim("\n" + "🧡 From Qingdao frontend development")
      ),
      {
        padding: 1,
        borderColor: "white",
        dimBorder: true,
        borderStyle: "round",
      }
    )
  )
}
