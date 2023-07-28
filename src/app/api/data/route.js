import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const getCopyJson = async (schema, type) => {
  const prompt = `You are an operator of an e-commerce website, and the product type of your website is ${type}.
                  The JSON data structure is as follows:

                  ${JSON.stringify(schema)}

                  Your task is to generate copywriting for each field in the JSON data that requires text according to the 'requirements'. For each field, you should follow the content requirements specified in the 'requirements' object and populate the 'value' field with the generated text.

                  Please note the following requirements:
                    - The 'requirements' object describes the content requirements for each field.
                    - If the 'requirements' object is empty, the field does not need to be processed.
                    - Don't just copy the 'requirements' to the 'value', but understand and generate real copy that can be used on your website, related to site-specific information, you can make it up.
                    - Do not change the JSON data structure.
                    - The output should be in JSON format and should contain only the updated JSON data structure. The format of the output should be an array with the same structure as the input form, and all output fields should be in double quotes.

                  Once you have generated copywriting for each field, AI will use it to populate the text on your e-commerce website.
                `
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": prompt}
      ],
      stream: false
    })
    const response = await res.json()

    console.log(response)
    const data = response.choices[0].message.content
    console.log('get copy success')
    return data
  } catch (error) {
    console.log(`Generate copy error: ` + error)
    return ({ error: "error", status:404})
  }
}

const getImageRequirementsJson = async (schema, type) => {
  const prompt = `You are a designer of an e-commerce website, and the product type of your website is ${type}.Please provide requirements for the images in the 'figure' object of each section in the JSON data.
                  
                  The JSON data structure is as follows:
                  
                  ${JSON.stringify(schema)}

                  For each section in the 'sections' array that has an 'image' in the 'figure' object, please add requirements to the 'figure.image.requirements' object.The requested content should be a sentence of copy that has the basic information of the image. It can be generated based on other copywriting information in this section, such as heading.value.

                  Please do not change the JSON data structure.
                  The output should be in JSON format and should contain only the updated JSON data structure. The format of the output should be an array with the same structure as the input form, and all output fields should be in double quotes.
                  Once you have provided the requirements for each image, AI will use them to generate images for your e-commerce website.
                  `
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": prompt}
      ]
    })
    const response = await res.json()
    const data = response.choices[0].message.content
    console.log('get image requirements success')
    return data
  } catch (error) {
    console.log(`Generate image requirements error: ` + error)
    return ({ error: "error", status:404})
  }
}

const getImageJson = async (schema) => {
  const data = JSON.parse(schema)
  console.log(data)
  if (data) {
    try {
      for (const section of data) {
        for (const [key, value] of Object.entries(section.props)) {
          if (key === 'figure') {
            const image_requirements = value.image.requirements;
            if (image_requirements) {
              const res = await openai.createImage({
                prompt: image_requirements,
                n: 1,
                size: "1024x1024",
              });
              const response = await res.json()
              const image_url = response.data[0].url;
              value.image.url = image_url;
            }
          }
          if (key === 'blocks') {
            for (const block of value) {
              for (const [block_key, block_value] of Object.entries(block)) {
                if (block_key === 'figure') {
                  const image_requirements = block_value.image.requirements;
                  if (image_requirements) {
                    const res = await openai.createImage({
                      prompt: image_requirements,
                      n: 1,
                      size: "1024x1024",
                    });
                    const response = await res.json()
                    const image_url = response.data[0].url;
                    block_value.image.url = image_url;
                  }
                }
              }
            }
          }
        }
      }
      console.log('get image success')
      return data;
    } catch (error) {
      console.log(`Generate image error: ` + error)
      return ({ error: "error", status:404})
    }
  }
}


export async function POST(req) {
  if (req.method === "POST") {
    const request = await req.json()
    const sections = request.sections
    const type = request.type

    if (sections !== undefined) {
      const sectionContentJson = sections
      const copyJson = await getCopyJson(sectionContentJson, type)
      const imageRequirementsJson = await getImageRequirementsJson(copyJson, type)
      const imageJson = await getImageJson(imageRequirementsJson)
      
      return NextResponse.json(imageJson);
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
