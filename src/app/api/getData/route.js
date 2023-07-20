import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

const resultFilePath = path.join(process.cwd(), "data", "module.json");

export async function GET(req) {
  if (req.method === "GET") {
    const resultData = JSON.stringify(JSON.parse(fs.readFileSync(resultFilePath)));
    return NextResponse.json(resultData);
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
