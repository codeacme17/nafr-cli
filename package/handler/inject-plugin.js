const shell = require("shelljs")
const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
const COLORS = require("../utils/color")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")

shell.config.fatal = true

const axios = () => {
  const TARGET_PLUGIN_DIR = getPluginDir()
  const SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )
  shell.cp("-R", SOURCE_FILE, TARGET_PLUGIN_DIR)
  install.axios(TARGET_PLUGIN_DIR)
}

const tailwindcss = () => {
  const ROOT_TARGET_DIR = path.resolve(".")
  const SRC_TARGET_DIR = path.resolve(".", "./src")

  const POSTCSS_SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/postcss.config.cjs`
  )
  const VUE_CSS_SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/style.css`
  )
  const VUE_TAILWIND_SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/tailwind.config.cjs`
  )
  const REACT_CSS_SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/index.css`
  )
  const REACT_TAILWIND_SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/tailwind.config.cjs`
  )

  if (!checkHasDependencies("vite", "devDep"))
    return console.error(
      `${chalk.hex(COLORS.RED)(
        "ERROR"
      )}: tailwindCSS is only support to '${chalk.hex(COLORS.YELLOW)(
        "vite"
      )}' project`
    )

  if (checkHasDependencies("vue", "dep")) {
    shell.cp("-R", POSTCSS_SOURCE_FILE, ROOT_TARGET_DIR)
    shell.cp("-R", VUE_CSS_SOURCE_FILE, SRC_TARGET_DIR)
    shell.cp("-R", VUE_TAILWIND_SOURCE_FILE, ROOT_TARGET_DIR)
    install.tailwindcss([SRC_TARGET_DIR, ROOT_TARGET_DIR])
  }

  if (checkHasDependencies("react", "dep")) {
    shell.cp("-R", POSTCSS_SOURCE_FILE, ROOT_TARGET_DIR)
    shell.cp("-R", REACT_CSS_SOURCE_FILE, SRC_TARGET_DIR)
    shell.cp("-R", REACT_TAILWIND_SOURCE_FILE, ROOT_TARGET_DIR)
    install.tailwindcss([SRC_TARGET_DIR, ROOT_TARGET_DIR])
  }
}

const plugin = {
  axios,
  tailwindcss,
}

module.exports = plugin

function getPluginDir() {
  if (fs.existsSync(path.resolve(".", "./src/plugin")))
    return path.resolve(".", "./src/plugin")

  if (fs.existsSync(path.resolve(".", "./src/plugins")))
    return path.resolve(".", "./src/plugins")

  shell.mkdir("-p", path.resolve(".", "./src/plugin"))
  return path.resolve(".", "./src/plugin")
}
