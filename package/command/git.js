const chalk = require("chalk")
const { COLORS, GIT_STANDARD } = require("../utils/config")

module.exports = ({ standard, emoji }) => {
  switch (true) {
    case standard:
      process.stdout.write(GIT_STANDARD)
      break

    case emoji:
      handleEmoji()
      break

    default:
      process.stdout.write(GIT_STANDARD)
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
      `${item.emoji}  ${chalk.hex(COLORS.GREEN)(item.name)} - ${chalk.hex(
        COLORS.GRAY
      )(item.description)}\n`
    )
  })
}
