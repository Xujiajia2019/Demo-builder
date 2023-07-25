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
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      setLoading(false)
      setError(true)
      throw new Error(data.error);
    }
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

    // const bestMatchSectionGroup = 'FeaturedCollection,ImageGrid,ImagewithText,Testimonial,ImagewithText'

    // 4. 根据 section 组合模板数据获取文案及图片
    const resultData = await generateData(bestMatchSectionGroup, productType, requirements)

    // console.log(`resultData: ${resultData}`)
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