import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateCompletion (req, res) {
  if (req.body.prompt !== undefined) {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${req.body.prompt}`
    })
    res.status(200).json({ text: `${completion.data.choices[0].text}` });
  } else {
    res.status(400).json({ text: "No prompt provided." });
  }
}