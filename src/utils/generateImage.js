import openai from 'openai';

openai.apiKey = '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';

export const generateImage = async (prompt) => {
  const response = await openai.Image.create(
    prompt=prompt,
    n=1,
    size="1024x1024"
  );
  return response['data'][0]['url'];
}