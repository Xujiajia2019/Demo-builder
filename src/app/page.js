"use client"
import { useState} from "react"
import { useRouter } from 'next/navigation'
import ProductsFileUpload from '../components/ProductsFileUpload'
import Input from '../components/Input'
import { Octokit } from "@octokit/core"


export default function Index() {
  const [brandName, setBrandName] = useState("");
  const [company, setCompany] = useState("");
  const [logo, setLogo] = useState("");
  const [brandStory, setBrandStory] = useState("");
  const [homepageBannerImage, setHomepageBannerImage] = useState("");
  const [homepageBannerHeading, setHomepageBannerHeading] = useState("");
  const [homepageBannerDescription, setHomepageBannerDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");

  const [productFile, setProductFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter()

  // 将数据存至 supabase
  async function saveData(jsonData, host) {
    const response = await fetch(`/api/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: jsonData,
        host: host
      })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error);
    }
  }

  async function uploadProduct(productData) {
    const response = await fetch(`/api/uploadProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: productData})
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      setLoading(false)
      throw new Error(data.error);
    }
  }

  async function publishProduct(id) {
    const response = await fetch(`/api/publishProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: id})
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      setLoading(false)
      throw new Error(data.error);
    }
  }

  async function uploadProductsData () {
    if (productFile) {
      const productLists = productFile.map(item => {
        return {
          product: {
            title: item.title,
            vendor: `${brandName}-${company}`,
            handle: item.handle,
            images: [
              {
                src: item.image_src,
                position: 1
              }
            ],
            variants: [
              {
                sku: item.sku,
                price: item.variant_price
              }
            ]
          }
        }
      })
      const uploadPromises = productLists.map(async product => {
        const productData = await uploadProduct(product)
        await publishProduct(productData.product.id)
      })
      await Promise.all(uploadPromises)
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    setLoading(true)

    // 上传产品数据
    await uploadProductsData()

    const resultData = {
      "brand": {
        "basic_information": {
          "brand_name": brandName,
          "vendor": company,
          "logo": logo
        },
        "brand_story": {
          "brand_story": brandStory
        }
      },
      "homepage_banner": {
        "figure": {
          "image": {
            "url": homepageBannerImage,
            "altText": "Snowboard"
          }
        },
        "heading": {
          "value": homepageBannerHeading
        },
        "description": {
          "value": homepageBannerDescription
        }
      },
      "products": {
        "size": 10
      },
      "design": {
        "primary_color": primaryColor
      }
    }

    const hostData = `demo-store-git-${brandName.toLowerCase()}-${company.toLowerCase()}-jessiefandb.vercel.app`
    // 将数据存储至 supabase 数据库
    const writeData = await saveData(resultData, hostData)


    // 触发 Github actions 构建代码
    const octokit = new Octokit({
      auth: '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'
    })

    await octokit.request('POST /repos/jessiefandb/Demo-store/dispatches', {
      event_type: 'on-create-store',
      client_payload: {
        branch: `${brandName.toLowerCase()}-${company.toLowerCase()}`,
        unit: false,
        integration: true
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    // 进入个人中心页面
    router.push('/projects')
  }


  return (
    <section>
      <div className="hero min-h-screen">
        <div className=""></div>
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">Start building your commerce site</h1>
            
            <form onSubmit={(event) => onSubmit(event)}>
              <Input label='Brand name' value={brandName} setValue={setBrandName}/>
              <Input label='Company' value={company} setValue={setCompany}/>
              <Input label='Logo' value={logo} setValue={setLogo}/>
              <Input label='Brand story' value={brandStory} setValue={setBrandStory}/>
              <Input label='Homepage banner image' value={homepageBannerImage} setValue={setHomepageBannerImage}/>
              <Input label='Homepage banner heading' value={homepageBannerHeading} setValue={setHomepageBannerHeading}/>
              <Input label='Brand banner description' value={homepageBannerDescription} setValue={setHomepageBannerDescription}/>
              <Input label='Primary color' value={primaryColor} setValue={setPrimaryColor}/>

              <ProductsFileUpload productFile={productFile} setProductFile={setProductFile}/>

              <button type="submit" className={loading ? "btn mt-4 btn-primary loading" : "btn mt-4 btn-primary"}>Start building</button>
              {error ? <p className="text-error">There is something wrong, please try again.</p> : null}
            </form>
            
          </div>
        </div>
      </div>
    </section>
  );
}
