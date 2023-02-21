const chalk = require("chalk")

const questions = require("../question/inject")
const injectPlugin = require("../handler/inject-plugin")
const COLORS = require("../utils/color")
const PLUGIN = require("../utils/plugin")

module.exports = async (pluginName) => {
  console.clear()

  pluginName = pluginName || (await choseInjectPlugin())
  pluginName = checkPluginNameValid(pluginName)
  if (!pluginName) return

  console.log()
  console.log(`📦  Installing ${chalk.cyan(pluginName)}...`)
  console.log()

  injectPlugin[pluginName]()
}

async function choseInjectPlugin() {
  const answers = await questions.pluginName()
  const pluginName = answers.PLUGINNAME
  return Promise.resolve(pluginName)
}

function checkPluginNameValid(pluginName) {
  const pluginNameLower = pluginName.toLowerCase()
  if (!PLUGIN.includes(pluginNameLower))
    return console.error(
      `Can not find plugin called '${chalk.hex(COLORS.YELLOW)(pluginName)}'`
    )
  else return pluginNameLower
}
