const shell = require("shelljs")
const path = require("path")
const chalk = require("chalk")

const checkHasDependencies = require("../utils/check-depences")
const install = require("../utils/install")
const { COLORS } = require("../utils/config")
const { TARGET, SOURCE_AXIOS, SOURCE_TAILWIND } = require("../utils/path")

shell.config.fatal = true

// Install axios and inject needed file
async function axios() {
  startInjectLog("axios")
  shell.cp("-R", SOURCE_AXIOS.axios_ts, TARGET.plugins)
  shell.cp("-R", SOURCE_AXIOS.apis, TARGET.src)
  await install.axios(TARGET.plugins)
  successInjectLog([
    {
      TARGET_DIR: TARGET.plugins,
      FILE_NAME: "axios.ts",
    },
    {
      TARGET_DIR: path.resolve(TARGET.src, "./apis"),
      FILE_NAME: "index.ts",
    },
    {
      TARGET_DIR: path.resolve(TARGET.src, "./apis/modules"),
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
    shell.cp("-R", SOURCE_TAILWIND.postcss_cjs, TARGET.root)
    shell.cp("-R", SOURCE_TAILWIND.vue_style_css, TARGET.src)
    shell.cp("-R", SOURCE_TAILWIND.vue_tailwind_cjs, TARGET.root)
    await install.tailwindcss([TARGET.src, TARGET.root])
    return successInjectLog([
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET.src,
        FILE_NAME: "style.css",
      },
    ])
  }

  // its react project
  if (checkHasDependencies("react", "dep")) {
    shell.cp("-R", SOURCE_TAILWIND.postcss_cjs, TARGET.root)
    shell.cp("-R", SOURCE_TAILWIND.react_index_css, TARGET.src)
    shell.cp("-R", SOURCE_TAILWIND.react_tailwind_cjs, TARGET.root)
    await install.tailwindcss([TARGET.src, TARGET.root])
    return successInjectLog([
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "postcss.config.cjs",
      },
      {
        TARGET_DIR: TARGET.root,
        FILE_NAME: "tailwind.config.cjs",
      },
      {
        TARGET_DIR: TARGET.src,
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
