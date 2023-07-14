"use client"
import { useState} from "react"
// import { generateCompletion } from "@/utils/generateCompletion";

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

  function handleNext() {
    setStep(step + 1);
  }

  const url = 'https://api.dify.ai/v1/chat-messages'

  async function getBestMatchTemplate(requirements) {
    const SECRET_KEY = 'app-lGjGNpPo4E28Rtx0if4EbX7P';
    const prompt = `${requirements}.Only output with template name with no other words or punctuation, even if the Answer.The output needs to be exactly the same as the data given. Output example:temp_1`;

    const headers = {
      'Authorization': `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json'
    };
  
    const payload = {
      "inputs": {},
      "query": prompt,
      "response_mode": "blocking",
      "user": "abc-123"
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const response_data = await response.json();
        console.log(response_data);

        // const best_match_template = response_data['answer'];
        // const extractedTemplate = extractTemplate(best_match_template);
        // setUIRequirements(extractedTemplate);
      } else {
        // Handle error response
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  }

  async function handleSubmit() {
    const prompt = uiRequirements
    const response = await fetch("/api/generateCompletion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let answer = await response.json();
    console.log(answer.choices[0].text)
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
          </div>
        </div>
      </div>
    </section>
  );
}
