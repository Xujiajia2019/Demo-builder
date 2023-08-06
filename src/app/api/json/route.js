import { Configuration, OpenAIApi } from 'openai-edge'
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runtime = 'edge'

export async function POST (req) {
  const request = await req.json()
  if (request.prompt) {
    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "user", "content": request.prompt}
        ]
      })
      const response = await res.json()
      const data = response.choices[0].message.content
      return NextResponse.json({data: JSON.parse(data)})
    } catch (error) {
      console.log(`Completion error: ` + error)
      return NextResponse.json({ error: "error", status:404})
    }
    
  }
  return NextResponse.json({ error: "Missing parameters", status:400})
}