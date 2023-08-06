import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";


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
    const imageJson = JSON.stringify(request.data)

    if (imageJson !== undefined) {
      const resultFilePath = path.join(process.cwd(), "data", "module.json");
      
      try {
        await writeFilePromise(resultFilePath, imageJson)
        return NextResponse.json({write: true});
      } catch (err) {
        return NextResponse.json({ error, status:401 });
      }
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
