"use client"
import { useState} from "react"

function StepOne(props) {

  function handleChange(event) {
    props.setProductType(event.target.value);
  }

  return (
    <div>
      <label className="label">
        <span>What is your product type?</span>
      </label>
      <input value={props.productType} onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
      <button className="btn btn-neutral mt-4" onClick={props.onNext}>Next Step</button>
    </div>
  )
}

function StepTwo(props) {
  function handleChange(event) {
    props.setRequirements(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>What is your requirements?</span>
      </label>
      <input value={props.requirements}
        onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
      <button className="btn btn-neutral mt-4" onClick={props.onNext}>Next Step</button>
    </div>
  )
}

function StepThree(props) {
  function handleChange(event) {
    props.setUIRequirements(event.target.value);
  }
  return (
    <div>
      <label className="label">
        <span>What is your UI requirements?</span>
      </label>
      <input value={props.uiRequirements}
        onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full" />
      <button className="btn mt-4 btn-primary" onClick={props.onSubmit}>Start building</button>
    </div>
  )
}

export default function Index() {
  const [step, setStep] = useState(1)
  const [productType, setProductType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [uiRequirements, setUIRequirements] = useState("");

  const [response, setResponse] = useState("");

  const url = 'https://api.dify.ai/v1/chat-messages'

  function handleNext() {
    setStep(step + 1);
  }

  async function findBestMatchTemplate() {
    const SECRET_KEY = "app-lGjGNpPo4E28Rtx0if4EbX7P";
    const prompt = `${requirements}.Only output with template name with no other words or punctuation, even if the Answer.The output needs to be exactly the same as the data given.Output example:temp_1`;

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
    const prompt = `${templateContentRequirements}.Your output should only contain the section names in order,separated by commas,do not use spaces periods and other punctuation other than commas`;
  
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
  async function generateCopyJson(schema) {
    const prompt = `You are an operator of an e-commerce website, and the product type of your website is ${productType}.
                    Your task is to create copywriting according to the requirements of a field.
                    Requirements:
                      - The content data structure of the e-commerce site is stored in JSON format delimited by triple quotes.
                      - Each field that needs to be populated with text has two keys, value and requirements.
                      - Requirements describes the content requirements for the field, and you need to generate the text and populate the value field with the requirements.
                      - If requirements is empty, it does not need to be processed.
                      - Do not change the JSON data structure.
                      - The output is in JSON format and the result must contain only JSON data and not any other descriptive text.
                    The template json is:
                    ${schema}
                    `
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });
    const data = await response.json();
    return data
  }
  async function generateImageRequirements(schema) {
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

                    ${schema}
                    `
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      }),
    });
    const data = await response.json();
    return data
  }

  async function generateImage(schema) {
    const response = await fetch(`/api/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schema
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data.content;
    } else {
      throw new Error(data.error);
    }
  }

  async function generateData(sections, type, requirements, uiRequirements) {
    const response = await fetch(`/api/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sections,
        type,
        requirements,
        uiRequirements
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }

  async function handleSubmit() {
    // // 1. 根据页面要求获取 Template
    // const bestMatchTemplate = await findBestMatchTemplate()

    // // 2. 根据模板数据获取对应模板的内容要求
    // const templateContent = await getTemplateContent(bestMatchTemplate)

    // // 3. 根据模板内容要求获取对应的 section 组合
    // const bestMatchSectionGroup = await findBestMatchSections(templateContent).replaceAll(' ', '')
    const bestMatchSectionGroup = "ImageBanner,FeaturedCollection,ImagewithText,Testimonial"

    // 4. 根据 section 组合模板数据获取文案及图片
    const resultData = await generateData(bestMatchSectionGroup, productType)

    // // 4. 根据 section 及对应数据组合模板数据结构 JSON 文件
    // const sectionContentJson = await getSectionContentJson(bestMatchSectionGroup)
    // // 5. 生成 JSON 文件对应文案
    // const copyData = await generateCopyJson(sectionContentJson)
    // // 6. 根据文案生成 JSON 文件对应图片描述
    // const imageRequirementsData = await generateImageRequirements(copyData)
    // // 7. 生成 JSON 文件对应图片
    // const resultData = await generateImage(imageRequirementsData)

    console.log(`resultData: ${resultData}`)

    // 8. 根据 UI 要求进行 style 模板选择

    // 9. 部署页面

    // 10. 重定向至对应页面

    // console.log(sectionContentJson)
    // const response = await fetch("/api/chat", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     prompt: uiPrompt,
    //   }),
    // });

    // const data = await response.json();
    // setResponse(data)
  }

  return (
    <section>
      <div className="hero min-h-screen">
        <div className=""></div>
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Start building your website</h1>
            {step === 1 && <StepOne onNext={handleNext} productType={productType} setProductType={setProductType} />}
            {step === 2 && <StepTwo onNext={handleNext} requirements={requirements} setRequirements={setRequirements} />}
            {step === 3 && <StepThree onSubmit={handleSubmit} uiRequirements={uiRequirements} setUIRequirements={setUIRequirements}/>}
            {response}
          </div>
        </div>
      </div>
    </section>
  );
}