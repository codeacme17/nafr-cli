const cfonts = require("cfonts")

function generate() {
  return cfonts.render("leyoonafr.", {
    font: "tiny",
    align: "left",
    colors: ["system"],
    background: "transparent",
    letterSpacing: 2,
    lineHeight: 1,
    space: true,
    maxLength: "20",
    gradient: ["white", "#1e1e1e"],
    independentGradient: false,
    transitionGradient: false,
    env: "node",
  })
}

module.exports = generate
