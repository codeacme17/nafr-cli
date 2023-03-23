const { GIT_STANDARD } = require("../utils/config")

module.exports = ({ strandard }) => {
  switch (true) {
    case strandard:
      process.stdout.write(GIT_STANDARD)
      break

    default:
      break
  }
}
