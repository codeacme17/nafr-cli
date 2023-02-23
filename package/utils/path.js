const path = require("path")
const shell = require("shelljs")
const fs = require("fs")

// Target dir paths
const TARGET = {
  root: path.resolve("."),
  src: path.resolve(".", "./src"),
  plugins: getPluginTargetDir(),
}

// Axios source files and dir paths
const SOURCE_AXIOS = {
  axios_ts: path.resolve(__dirname, `../../template/plugin/axios/axios.ts`),
  apis: path.resolve(__dirname, "../../template/plugin/axios/apis"),
}

// TailwindCSS source files paths
const SOURCE_TAILWIND = {
  postcss_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/postcss.config.cjs`
  ),
  vue_style_css: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/style.css`
  ),
  vue_tailwind_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/vue/tailwind.config.cjs`
  ),
  react_index_css: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/index.css`
  ),
  react_tailwind_cjs: path.resolve(
    __dirname,
    `../../template/plugin/tailwindCSS/react/tailwind.config.cjs`
  ),
}

module.exports = {
  TARGET,
  SOURCE_AXIOS,
  SOURCE_TAILWIND,
}

function getPluginTargetDir() {
  const TARGET_DIR_plugins = path.resolve(".", "./src/plugins")
  if (!fs.existsSync(TARGET_DIR_plugins)) shell.mkdir("-p", TARGET_DIR_plugins)
  return TARGET_DIR_plugins
}
