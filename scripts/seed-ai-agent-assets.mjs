import fs from "node:fs";
import path from "node:path";
import {createClient} from "next-sanity";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)=(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("SANITY_API_WRITE_TOKEN is missing in .env.local");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5vojr174",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token,
  useCdn: false,
});

const assets = [
  ["ai-agent-banner", "AI Agent Development page hero", "Abstract AI agents coordinating digital workflows", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/06/redefine-ai-agents-b78a3ab47f9428edc94933f38bad02b8.webp"],
  ["ai-agent-discovery", "AI agent use-case discovery", "Business teams mapping opportunities for AI agents", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/business-potential-with-ai-84f4660d09272a89ed2567b712496d24.webp"],
  ["ai-agent-architecture", "AI agent workflow automation", "AI agent automating a business workflow", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/automate-yourBusiness-with-AI-2c7c8ec529d898f2a3ba4d0666b4468f.webp"],
  ["ai-agent-models", "Custom AI agent solutions", "Custom AI agent solutions designed for business needs", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/customized-solutions-9ed1f55ac4f3b402b1d08b26870c34a6.webp"],
  ["ai-agent-deployment", "AI agent engineering expertise", "AI experts building and deploying agent systems", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/proven-expertise-in-automation-e7af19935015fb11dedb9fbb2955f880.webp"],
  ["ai-agent-industries", "AI agent industry applications", "AI agent applications across business industries", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/strategic-ai-partnership-890e8cebfa390cee4536728b4149d70b.webp"],
  ["ai-agent-capabilities", "AI agent core capabilities", "Connected AI agents taking action across a business workflow", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/03/business-potential-with-ai-84f4660d09272a89ed2567b712496d24.webp"],
];

for (const [slot, title, alt, url] of assets) {
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const filename = url.split("/").pop();
  const contentType = response.headers.get("content-type") || "image/webp";
  const uploaded = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id}', {slot});
  const doc = {_type: "siteAsset", slot, title, alt, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}
