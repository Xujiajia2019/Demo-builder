import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const schemaFilePath = path.join(process.cwd(), "data", "example_schema.json");
const getSectionContentJson = (sections, schemaData) => {
  const desiredOrder = sections.split(",");
  const rawData = [];
  for (const sectionName of desiredOrder) {
    for (const template of schemaData) {
      if (template.section === sectionName) {
        rawData.push(template);
        break;
      }
    }
  }
  return rawData;
};


const getCopyJson = async (schema, type) => {
  console.log(schema)
  const prompt = `You are an operator of an e-commerce website, and the product type of your website is ${type}.
                  The given json is the data structure of the e-commerce site homepage:
                  ${JSON.stringify(schema)}

                Your task is to create copywriting according to the requirements of a field.
                Requirements:
                  - Each field that needs to be populated with text has two keys, value and requirements.
                  - Requirements describes the content requirements for the field, and you need to generate the text and populate the value field with the requirements.
                  - If requirements is empty, it does not need to be processed.
                  - Do not change the JSON data structure.
                  - The output is in JSON format and the result must contain only JSON data and not any other descriptive text.
                `
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": prompt}
      ]
    })
    const data = res.data.choices[0].message.content
    console.log('get copy success')
    console.log(JSON.stringify(data))
    return data
  } catch (error) {
    console.log(`Generate copy error: ` + error)
    return ({ error: "error", status:404})
  }
}

const getImageRequirementsJson = async (schema, uiRequirements) => {
  console.log(schema)
  const prompt = `You are a designer of an e-commerce website, and the product type of your website is {product_type}, the UI requirements are ${uiRequirements}.
                  Your task is generate image prompts based on the heading and description of each section on the home page, these prompts will be given to ai to generate the images.
                  Requirements:
                    - The content data structure of the e-commerce site is stored in JSON format delimited by triple quotes.
                    - Each item in the array is a section, sections with image has 'figure.image' key, you should fill in the 'figure.image.requirements' according to heading and description. 
                    - Do not change the JSON data structure.
                    - The output is in JSON format and the result must contain only JSON data and not any other descriptive text.
                    - The format of the output needs to be an array, with the same structure as the input form
                    - All output fields should be in double quotes
                    - No need to format with line breaks
                    - No need to use any formatting symbols
                    - You are not allowed to change the json structure
                    - Output in json

                    ---${schema}---
                    `
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "user", "content": prompt}
      ]
    })
    const data = res.data.choices[0].message.content
    console.log('get image requirements success')
    console.log(JSON.stringify(data))
    return JSON.stringify(data)
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
              const response = await openai.createImage({
                prompt: image_requirements,
                n: 1,
                size: "1024x1024",
              });
              const image_url = response.data.data[0].url;
              value.image.url = image_url;
            }
          }
          if (key === 'blocks') {
            for (const block of value) {
              for (const [block_key, block_value] of Object.entries(block)) {
                if (block_key === 'figure') {
                  const image_requirements = block_value.image.requirements;
                  if (image_requirements) {
                    const response = await openai.createImage({
                      prompt: image_requirements,
                      n: 1,
                      size: "1024x1024",
                    });
                    const image_url = response.data.data[0].url;
                    block_value.image.url = image_url;
                  }
                }
              }
            }
          }
        }
      }
      console.log('get image success')
      return JSON.stringify(data);
    } catch (error) {
      console.log(`Generate image error: ` + error)
      return ({ error: "error", status:404})
    }
  }
}

const writeFilePromise = (filepath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath,data, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}


export async function POST(req) {
  if (req.method === "POST") {
    const request = await req.json()
    const sections = request.sections
    const type = request.type
    const uiRequirements = request.uiRequirements

    if (sections !== undefined) {
      const schemaData = JSON.parse(fs.readFileSync(schemaFilePath));
      const sectionContentJson = getSectionContentJson(sections, schemaData);
      const copyJson = await getCopyJson(sectionContentJson, type)
      const imageRequirementsJson = await getImageRequirementsJson(JSON.stringify(copyJson), uiRequirements)
      const imageJson = await getImageJson(imageRequirementsJson)
      
      const resultFilePath = path.join(process.cwd(), "data", "module.json");
      
      try {
        console.log(imageJson)
        await writeFilePromise(resultFilePath, imageJson)
        return NextResponse.json({write: true});
      } catch (err) {
        return NextResponse.json({ error: "Write file failed", status:401 });
      }
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
