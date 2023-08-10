import { NextResponse } from 'next/server';

export async function POST(req) {
  const request = await req.json()
  if (request.data) {
    try {
      const response = await fetch('https://jessiedemo.myshopify.com/admin/api/2023-07/products.json', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": "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"
        },
        body: JSON.stringify(request.data)
      })
      const result = await response.json()
      if (!response.ok) {
        return NextResponse.json({error: result})
      } else {
        return NextResponse.json(result)
      }
    } catch (error) {
      return NextResponse.json({error})
    }
  }
  return NextResponse.json({ error: "Missing parameters", status:400})
}
