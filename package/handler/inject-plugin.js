const shell = require("shelljs")
const path = require("path")
const fs = require("fs")
const chalk = require("chalk")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")
const { COLORS } = require("../utils/config")

shell.config.fatal = true

// Install axios and inject needed file
async function axios() {
  const TARGET_PLUGIN_DIR = getTargetPluginDir()
  const SOURCE_FILE = path.resolve(
    __dirname,
    `../../template/plugin/axios/axios.js`
  )
  shell.cp("-R", SOURCE_FILE, TARGET_PLUGIN_DIR)
  await install.axios(TARGET_PLUGIN_DIR)
  successInjectLog([
    {
      TARGET_DIR: TARGET_PLUGIN_DIR,
      FILE_NAME: "axios.js",
    },
  ])
}

// Install tailwindCSS and inject needed file
// * only supports to Vue / React project build by vite
async function tailwindcss() {
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
    return errorInjectLog("tailwindCSS", "vite")

  // its vue project
  if (checkHasDependencies("vue", "dep")) {
    shell.cp("-R", POSTCSS_SOURCE_FILE, ROOT_TARGET_DIR)
    shell.cp("-R", VUE_CSS_SOURCE_FILE, SRC_TARGET_DIR)
    shell.cp("-R", VUE_TAILWIND_SOURCE_FILE, ROOT_TARGET_DIR)
    await install.tailwindcss([SRC_TARGET_DIR, ROOT_TARGET_DIR])
    successInjectLog([
      {
        TARGET_DIR: ROOT_TARGET_DIR,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: ROOT_TARGET_DIR,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: SRC_TARGET_DIR,
        FILE_NAME: "style.css",
      },
    ])
    return
  }

  // its react project
  if (checkHasDependencies("react", "dep")) {
    shell.cp("-R", POSTCSS_SOURCE_FILE, ROOT_TARGET_DIR)
    shell.cp("-R", REACT_CSS_SOURCE_FILE, SRC_TARGET_DIR)
    shell.cp("-R", REACT_TAILWIND_SOURCE_FILE, ROOT_TARGET_DIR)
    await install.tailwindcss([SRC_TARGET_DIR, ROOT_TARGET_DIR])
    successInjectLog([
      {
        TARGET_DIR: ROOT_TARGET_DIR,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: ROOT_TARGET_DIR,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: SRC_TARGET_DIR,
        FILE_NAME: "index.css",
      },
    ])
    return
  }

  // either not vue / react
  errorInjectLog("tailwindCSS", "Vue or React")
}

const plugin = {
  axios,
  tailwindcss,
}

module.exports = plugin

function getTargetPluginDir() {
  if (fs.existsSync(path.resolve(".", "./src/plugin")))
    return path.resolve(".", "./src/plugin")

  if (fs.existsSync(path.resolve(".", "./src/plugins")))
    return path.resolve(".", "./src/plugins")

  shell.mkdir("-p", path.resolve(".", "./src/plugin"))
  return path.resolve(".", "./src/plugin")
}

function successInjectLog(files) {
  files.forEach((file) => {
    const FILE_PATH = path.resolve(file.TARGET_DIR, "./", file.FILE_NAME)
    console.log(
      `${chalk.hex(COLORS.GREEN)("✔")}  Successfully injected file: ${chalk.hex(
        COLORS.GREEN
      )(FILE_PATH)}`
    )
    console.log()
  })
}

function errorInjectLog(plugin, dep) {
  console.error(
    `${chalk.hex(COLORS.RED)(
      "ERROR"
    )}: ${plugin} is only support to '${chalk.hex(COLORS.YELLOW)(dep)}' project`
  )
  console.log()
}
