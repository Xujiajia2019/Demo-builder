"use client"
import { useState} from "react"
import { useRouter } from 'next/navigation'

function StepOne(props) {

  function handleChange(event) {
    props.setProductType(event.target.value);
  }

  return (
    <form onSubmit={(event) => props.onNext(event)}>
      <label className="label">
        <span>What is your product type?</span>
      </label>
      <input autoFocus value={props.productType} onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
      <p className="text-left text-gray-400 mt-2">Phones, Earphones, E-bike......</p>
      <button type="submit" className="btn btn-neutral mt-4" >Next Step</button>
    </form>
  )
}

function StepTwo(props) {
  function handleChange(event) {
    props.setRequirements(event.target.value);
  }
  return (
    <form onSubmit={(event) => props.onSubmit(event)}>
      <label className="label">
        <span>What is your requirements?</span>
      </label>
      <input autoFocus value={props.requirements}
        onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
      <p className="text-left text-gray-400 mt-2">Show my main product, highlight the key features, introduce about the brand...</p>
      <button type="submit" className={props.isLoading ? "btn mt-4 btn-primary loading" : "btn mt-4 btn-primary"}>Start building</button>
      {props.error ? <p className="text-error">There is something wrong, please try again.</p> : null}
    </form>
  )
}

export default function Index() {
  const [step, setStep] = useState(1)
  const [productType, setProductType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter()

  const url = 'https://api.dify.ai/v1/chat-messages'

  function handleNext(event) {
    event.preventDefault()
    setStep(step + 1);
  }

  async function findBestMatchTemplate() {
    const SECRET_KEY = "app-lGjGNpPo4E28Rtx0if4EbX7P";
    const prompt = `${requirements}`;

    const headers = {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const payload = {
      inputs: {},
      query: `${prompt}`,
      response_mode: "blocking",
      user: "abc-123",
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const response_data = await response.json();

    const best_match_template = response_data.answer;
    return extractTemp(best_match_template);
  }

  function extractTemp(string) {
    const pattern = /temp_[1-2]/;
    const match = string.match(pattern);
    if (match) {
      return match[0];
    } else {
      return "temp_1";
    }
  };

  async function getTemplateContent(templateName) {
    const response = await fetch(`/api/templates?templateName=${templateName}`);
    const data = await response.json();
    if (response.ok) {
      return data.content;
    } else {
      throw new Error(data.error);
    }
  }

  async function findBestMatchSections(templateContentRequirements) {
    const SECRET_KEY = "app-mPTrm0OdnSOfHDZ3lNlgnbMO";
    const prompt = `${templateContentRequirements}`;
  
    const headers = {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json",
    };
    const payload = {
      inputs: {},
      query: `${prompt}`,
      response_mode: "blocking",
      user: "abc-123",
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const response_data = await response.json();
    const best_match_sections = response_data.answer;
    return best_match_sections;
  };

  async function getSectionContentJson(sections) {
    const response = await fetch(`/api/sections?sections=${sections}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }

  async function generateCopyJson(schema, type) {
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
    const response = await fetch("/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });
    const data = await response.json();
    return data.data
  }

  async function generateImageRequirements(schema, type) {
    const prompt = `You are a designer of an e-commerce website, and the product type of your website is ${type}.Please provide requirements for the images in the 'figure' object of each section in the JSON data.
                  
                  The JSON data structure is as follows:

                  ${JSON.stringify(schema)}

                  For each section in the 'sections' array that has an 'image' in the 'figure' object, please add requirements to the 'figure.image.requirements' object.The requested content should be a sentence of copy that has the basic information of the image. It can be generated based on other copywriting information in this section, such as heading.value.

                  Please do not change the JSON data structure.
                  The output should be in JSON format and should contain only the updated JSON data structure. The format of the output should be an array with the same structure as the input form, and all output fields should be in double quotes.
                  Once you have provided the requirements for each image, AI will use them to generate images for your e-commerce website.
                  `
    const response = await fetch("/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });
    const data = await response.json();
    return data.data
  }

  async function generateImage(prompt) {
    const response = await fetch(`/api/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.url;
    } else {
      return "https://cdn.shopifycdn.net/s/files/1/0723/7559/9411/files/img-placeholder.jpg?v=1685346613"
    }
  }

  async function getImage(schema) {
    const data = schema
    for (const section of data) {
      for (const [key, value] of Object.entries(section.props)) {
        if (key === 'figure') {
          const image_requirements = value.image.requirements;
          if (image_requirements) {
            const image_url = await generateImage(image_requirements)
            value.image.url = image_url;
          }
        }
        if (key === 'blocks') {
          for (const block of value) {
            for (const [block_key, block_value] of Object.entries(block)) {
              if (block_key === 'figure') {
                const image_requirements = block_value.image.requirements;
                if (image_requirements) {
                  const image_url = await generateImage(image_requirements)
                  block_value.image.url = image_url;
                }
              }
            }
          }
        }
      }
    }
    return data
  }

  async function saveData(jsonData, type, requirements) {
    const response = await fetch(`/api/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: jsonData,
        type,
        requirements
      })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }

  async function generateData(sections, type, requirements) {
    const response = await fetch(`/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections,
        type,
        requirements
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      setLoading(false)
      setError(true)
      throw new Error(data.error);
    }
  }

  async function processItems(sections) {
    let results = []
    const items = sections.split(',');
    for (const item of items) {
      // 4. 根据 section 组合获取模板数据
      const schemaData = await getSectionContentJson(item);
  
      // 5. 生成文案
      const copyData = await generateCopyJson(schemaData, productType);
      console.log(copyData);
  
      // 6. 生成图片描述
      const imageRequirementsData = await generateImageRequirements(copyData, productType);
      console.log(imageRequirementsData);
  
      // 7. 生成图片
      const result = await getImage(imageRequirementsData);
      results.push(result[0]);
    }
    return results
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    // 1. 根据页面要求获取 Template
    const bestMatchTemplate = await findBestMatchTemplate()

    // 2. 根据模板数据获取对应模板的内容要求
    const templateContent = await getTemplateContent(bestMatchTemplate)

    // 3. 根据模板内容要求获取对应的 section 组合
    const bestMatchSection = await findBestMatchSections(templateContent)
    const bestMatchSectionGroup = bestMatchSection.replaceAll(' ', '')
    console.log(bestMatchSectionGroup)
    
    // Call the function to start the processing
    const resultData = await processItems(bestMatchSectionGroup);
    console.log(resultData)
    
    // const resultData = await generateData(schemaData, productType, requirements)

    // 8. 数据存储
    const writeData = await saveData(resultData, productType, requirements)

    setLoading(false)
    router.push('/preview')
  }


  return (
    <section>
      <div className="hero min-h-screen">
        <div className=""></div>
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Start building your homepage</h1>
            {step === 1 && <StepOne onNext={handleNext} productType={productType} setProductType={setProductType} />}
            {step === 2 && <StepTwo isLoading={loading} error={error} onSubmit={handleSubmit} requirements={requirements} setRequirements={setRequirements} />}
          </div>
        </div>
      </div>
    </section>
  );
}