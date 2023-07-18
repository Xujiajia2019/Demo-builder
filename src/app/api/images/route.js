import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from 'next/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST (req) {
  const request = await req.json()
  const data = request.schema
  if (data) {
    try {
      for (const section of data) {
        for (const [key, value] of Object.entries(section.props)) {
          if (key === 'figure') {
            const image_requirements = value.image.requirements;
            const response = await openai.Image.create({
              prompt: image_requirements,
              n: 1,
              size: "1024x1024",
            });
            const image_url = response.data[0].url;
            value.image.url = image_url;
          }
          if (key === 'blocks') {
            for (const block of value) {
              for (const [block_key, block_value] of Object.entries(block)) {
                if (block_key === 'figure') {
                  const image_requirements = block_value.image.requirements;
                  if (image_requirements) {
                    const response = await openai.Image.create({
                      prompt: image_requirements,
                      n: 1,
                      size: "1024x1024",
                    });
                    const image_url = response.data[0].url;
                    block_value.image.url = image_url;
                  }
                }
              }
            }
          }
        }
      }
      return data;
    } catch (error) {
      console.log(`Generate image error: ` + error)
      return NextResponse.json({ error: "error", status:404})
    }
  }
  return NextResponse.json({ error: "Missing parameters", status:400})
}
