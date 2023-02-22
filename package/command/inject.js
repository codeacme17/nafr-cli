const chalk = require("chalk")

const questions = require("../question/inject")
const injectPlugin = require("../handler/inject-plugin")
const { COLORS, PLUGIN } = require("../utils/config")

/**
 *  @description `$ nafr inject` command handler
 *  @param pluginName the name of needed plugin
 */
module.exports = async (pluginName) => {
  console.clear()
  pluginName = pluginName || (await choseInjectPlugin())
  pluginName = getValidPluginName(pluginName)
  if (!pluginName) return
  injectPlugin[pluginName]()
}

// invoke plugin question - chose whitch plugin to inject
async function choseInjectPlugin() {
  const answers = await questions.pluginName()
  const pluginName = answers.PLUGINNAME
  return Promise.resolve(pluginName)
}

function getValidPluginName(pluginName) {
  const pluginNameLower = pluginName.toLowerCase()

  if (PLUGIN.includes(pluginNameLower)) return pluginNameLower
  return console.error(
    `Can not find plugin called '${chalk.hex(COLORS.YELLOW)(pluginName)}'`
  )
}
