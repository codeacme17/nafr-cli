const chalk = require("chalk")

const COLORS = {
  GRAY: "#525252",
  BLUE: "#0284c7",
  RED: "#EF4444",
  GREEN: "#10B981",
  YELLOW: "#eab308",
  PURPLE: "#e879f9",
  ORANGE: "#f59e0b",
}

const PLUGIN = ["axios", "tailwindcss", "eslint"]

const PROJECT = ["vanilla", "vue", "react"]

const GIT_STANDARD = `${chalk.hex(COLORS.GRAY)("TEMPLATE:")}
${chalk.hex(COLORS.GREEN)(
  `<type>(<scope>): <subject>
<body>
<footer>`
)}

${chalk.hex(COLORS.GRAY)("WHERE:")}
  ${chalk.hex(COLORS.RED)(
    "<type>"
  )} Indicates the type of change being made. Possible values include:
    - ${chalk.hex(COLORS.YELLOW)("feat")}: A new feature.
    - ${chalk.hex(COLORS.YELLOW)("fix")}: A bug fix.
    - ${chalk.hex(COLORS.YELLOW)("docs")}: Documentation changes.
    - ${chalk.hex(COLORS.YELLOW)(
      "style"
    )}: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    - ${chalk.hex(COLORS.YELLOW)(
      "refactor"
    )}: A code change that neither fixes a bug nor adds a feature.
    - ${chalk.hex(COLORS.YELLOW)(
      "perf"
    )}: A code change that improves performance.
    - ${chalk.hex(COLORS.YELLOW)(
      "test"
    )}: Adding missing tests or correcting existing tests.
    - ${chalk.hex(COLORS.YELLOW)(
      "chore"
    )}: Changes to the build process or auxiliary tools and libraries such as documentation generation.
 
  ${chalk.hex(COLORS.RED)(
    "<scope>"
  )} Indicates the scope of the change. This can be anything describing the area of the code that was affected.

  ${chalk.hex(COLORS.RED)("<subject>")} A brief summary of the change

  ${chalk.hex(COLORS.RED)(
    "<body>"
  )} A more detailed description of the change, including any additional context or reasoning.

  ${chalk.hex(COLORS.RED)(
    "<footer>"
  )} Any relevant metadata related to the change, such as references to related issues or pull requests.\n
`

module.exports = {
  COLORS,
  PLUGIN,
  PROJECT,
  GIT_STANDARD,
}
