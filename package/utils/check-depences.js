const path = require("path")

function checkHasDependencies(package, type) {
  const packagePath = path.resolve(".", "./package.json")
  const packageData = require(packagePath)

  let dependencies

  if (type === "dep") dependencies = packageData.dependencies
  if (type === "devDep") dependencies = packageData.devDependencies

  return Object.keys(dependencies).includes(package)
}

module.exports = checkHasDependencies
