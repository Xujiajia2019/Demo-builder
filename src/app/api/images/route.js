import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST (req) {
  const request = await req.json()
  console.log(request.prompt)
  if (request.prompt) {
    try {
      const res = await openai.createImage({
        prompt: request.prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = res.data.data[0].url;
      return NextResponse.json({url: image_url})
    } catch (error) {
      console.log(`Generate image error: ` + error)
      return NextResponse.json({ error: "error", status:404})
    }
  }
  return NextResponse.json({ error: "Missing parameters", status:400})
}