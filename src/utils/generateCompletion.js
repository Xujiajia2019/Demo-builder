import openai from 'openai';

openai.apiKey = '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';

export const generateCompletion = async (prompt) => {
  const response = await openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages=[
      {"role": "user", "content": prompt_message}
    ]
  );
  return response.choices[0].message.content;
}