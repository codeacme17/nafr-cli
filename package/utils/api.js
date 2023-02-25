const { Configuration, OpenAIApi } = require("openai")

const API_KEY = require("../../KEY.json").OPENAI_API
const configuration = new Configuration({
  apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)

async function generateChat(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Q: ${prompt}`,
    temperature: 0.9,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: ["Q: "],
  })
  let res = response.data.choices[0].text
  if (res.startsWith("\n\n")) res = res.substring(2)
  if (res.startsWith("A: ")) res = res.substring(3)
  return res
}

module.exports = {
  generateChat,
}
