import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

const templatesFilePath = path.join(process.cwd(), "data", "homepage_templates.json");

const getTemplateContent = (templateName, templatesData) => {
  const template = templatesData.find((t) => t.name === templateName);
  if (template) {
    return template.content;
  } else {
    return null;
  }
};

export async function GET(req) {
  if (req.method === "GET") {
    const { searchParams } = new URL(req.url)
    const templateName = searchParams.get('templateName')
    if (templateName !== undefined) {
      const templatesData = JSON.parse(fs.readFileSync(templatesFilePath));
      const templateContent = getTemplateContent(templateName, templatesData);
      if (templateContent !== null) {
        return NextResponse.json({ content: templateContent });
      } else {
        return NextResponse.json({ error: "Template not found", status:404 });
      }
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
