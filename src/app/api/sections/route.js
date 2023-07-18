import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

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

export async function GET(req) {
  if (req.method === "GET") {
    const { searchParams } = new URL(req.url)
    const sections = searchParams.get('sections')
    if (sections !== undefined) {
      const schemaData = JSON.parse(fs.readFileSync(schemaFilePath));
      const sectionContentJson = getSectionContentJson(sections, schemaData);
      return NextResponse.json(sectionContentJson);
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
