const shell = require("shelljs")
const path = require("path")
const chalk = require("chalk")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")
const { COLORS } = require("../utils/config")
const {
  TARGET_DIR_root,
  TARGET_DIR_src,
  TARGET_DIR_plugins,
  SOURCE_FILE_axios,
  SOURCE_DIR_apis,
  SOURCE_FILE_postcss,
  SOURCE_FILE_vue_style_css,
  SOURCE_FILE_vue_tailwind,
  SOURCE_FILE_react_index_css,
  SOURCE_FILE_react_tailwind,
} = require("../utils/path")

shell.config.fatal = true

// Install axios and inject needed file
async function axios() {
  startInjectLog("axios")
  shell.cp("-R", SOURCE_FILE_axios, TARGET_DIR_plugins)
  shell.cp("-R", SOURCE_DIR_apis, TARGET_DIR_src)
  // insertCodeToViteConfig()
  await install.axios(TARGET_DIR_plugins)
  successInjectLog([
    {
      TARGET_DIR: TARGET_DIR_plugins,
      FILE_NAME: "axios.ts",
    },
    {
      TARGET_DIR: path.resolve(TARGET_DIR_src, "./apis"),
      FILE_NAME: "index.ts",
    },
    {
      TARGET_DIR: path.resolve(TARGET_DIR_src, "./apis/modules"),
      FILE_NAME: "test.ts",
    },
  ])
}

// Install tailwindCSS and inject needed file
// * only supports to Vue / React project build by vite
async function tailwindcss() {
  if (!checkHasDependencies("vite", "devDep"))
    return errorInjectLog("tailwindCSS", "vite")

  startInjectLog("tailwindCSS")

  // its vue project
  if (checkHasDependencies("vue", "dep")) {
    shell.cp("-R", SOURCE_FILE_postcss, TARGET_DIR_root)
    shell.cp("-R", SOURCE_FILE_vue_style_css, TARGET_DIR_src)
    shell.cp("-R", SOURCE_FILE_vue_tailwind, TARGET_DIR_root)
    await install.tailwindcss([TARGET_DIR_src, TARGET_DIR_root])
    return successInjectLog([
      {
        TARGET_DIR: TARGET_DIR_root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET_DIR_root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET_DIR_src,
        FILE_NAME: "style.css",
      },
    ])
  }

  // its react project
  if (checkHasDependencies("react", "dep")) {
    shell.cp("-R", SOURCE_FILE_postcss, TARGET_DIR_root)
    shell.cp("-R", SOURCE_FILE_react_index_css, TARGET_DIR_src)
    shell.cp("-R", SOURCE_FILE_react_tailwind, TARGET_DIR_root)
    await install.tailwindcss([TARGET_DIR_src, TARGET_DIR_root])
    return successInjectLog([
      {
        TARGET_DIR: TARGET_DIR_root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET_DIR_root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET_DIR_src,
        FILE_NAME: "index.css",
      },
    ])
  }

  // either not vue / react
  errorInjectLog("tailwindCSS", "Vue or React")
}

// Install ESlint and inject needed file
async function eslint() {
  console.log("eslint")
}

const plugin = {
  axios,
  tailwindcss,
  eslint,
}

module.exports = plugin

function startInjectLog(plugin) {
  console.log()
  console.log(`📦  Injecting ${chalk.cyan(plugin)}...`)
  console.log()
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
