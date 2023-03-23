const chalk = require("chalk")
const { COLORS, GIT_STANDARD } = require("../utils/config")
const { warn } = require("../utils/log")

module.exports = (argv) => {
  if (Object.keys(argv).length > 1) {
    warn("Can not handler multiple options")
    return
  }

  switch (true) {
    case argv.standard:
      process.stdout.write(GIT_STANDARD)
      break

    case argv.emoji:
      handleEmoji()
      break

    default:
      warn(
        `You must enter an option to ${chalk.hex(COLORS.GREEN)("git")} command`
      )
      break
  }
}

async function handleEmoji() {
  const { gitmojis } = await import("gitmojis")
  const res = gitmojis.map((emoji) => {
    return {
      emoji: emoji.emoji,
      name: emoji.name,
      description: emoji.description,
    }
  })

  res.forEach((item) => {
    process.stdout.write(
      ` ${item.emoji}\t  ${chalk.hex(COLORS.GREEN)(item.name)} - ${chalk.hex(
        COLORS.GRAY
      )(item.description)}\n`
    )
  })
}
