const { GIT_STANDARD } = require("../utils/config")

module.exports = ({ standard }) => {
  switch (true) {
    case standard:
      process.stdout.write(GIT_STANDARD)
      break

    default:
      process.stdout.write(GIT_STANDARD)
      break
  }
}
