const path = require("path")
const shell = require("shelljs")
const fs = require("fs")

const TARGET_DIR_root = path.resolve(".")
const TARGET_DIR_src = path.resolve(".", "./src")
const TARGET_DIR_plugins = getPluginTargetDir()

// Axios
const SOURCE_FILE_axios = path.resolve(
  __dirname,
  `../../template/plugin/axios/axios.ts`
)
const SOURCE_DIR_apis = path.resolve(
  __dirname,
  "../../template/plugin/axios/apis"
)

// TailwindCSS
const SOURCE_FILE_postcss = path.resolve(
  __dirname,
  `../../template/plugin/tailwindCSS/postcss.config.cjs`
)
const SOURCE_FILE_vue_style_css = path.resolve(
  __dirname,
  `../../template/plugin/tailwindCSS/vue/style.css`
)
const SOURCE_FILE_vue_tailwind = path.resolve(
  __dirname,
  `../../template/plugin/tailwindCSS/vue/tailwind.config.cjs`
)
const SOURCE_FILE_react_index_css = path.resolve(
  __dirname,
  `../../template/plugin/tailwindCSS/react/index.css`
)
const SOURCE_FILE_react_tailwind = path.resolve(
  __dirname,
  `../../template/plugin/tailwindCSS/react/tailwind.config.cjs`
)

module.exports = {
  TARGET_DIR_root,
  TARGET_DIR_src,
  TARGET_DIR_plugins,
  SOURCE_DIR_apis,
  SOURCE_FILE_axios,
  SOURCE_FILE_postcss,
  SOURCE_FILE_vue_style_css,
  SOURCE_FILE_vue_tailwind,
  SOURCE_FILE_react_index_css,
  SOURCE_FILE_react_tailwind,
}

function getPluginTargetDir() {
  const TARGET_DIR_plugins = path.resolve(".", "./src/plugins")
  if (!fs.existsSync(TARGET_DIR_plugins)) shell.mkdir("-p", TARGET_DIR_plugins)
  return TARGET_DIR_plugins
}
