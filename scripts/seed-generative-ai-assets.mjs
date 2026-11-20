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
  ["generative-ai-banner", "Generative AI page hero", "Abstract AI network with a person using a computer", "generative-ai-banner-f7d231711d490bcbf845df42c7eb6096.webp"],
  ["generative-ai-discovery", "Generative AI discovery", "Generative AI opportunity discovery and planning", "ai-discovery-8b2c5535d232cb9ff45a6944915000b1.webp"],
  ["generative-ai-launchpad", "Generative AI launchpad", "Rapid prototyping and testing for generative AI", "ai-launchpad-e9db2508797f0fd542868299c00e8091.webp"],
  ["generative-ai-adoption", "Generative AI adoption", "Responsible adoption of generative AI across a business", "ai-adoption-b0f6f28c3065e0915c75c63da3f68e25.webp"],
  ["generative-ai-reinvention", "Generative AI enterprise reinvention", "Enterprise workflows transformed with generative AI", "enterprise-reinvention-819a3bcb5e14272a8d85ef7b6feeb89d.webp"],
  ["generative-ai-applications", "Generative AI applications", "Generative AI creating text, imagery, and business content", "unleash-the-power-of-generative-ai-ede79a5ee534f274b5f109567e6c4722.webp"],
  ["generative-ai-consultation", "Generative AI consultation", "Discuss a generative AI project with the Kodrise team", "contact-with-an-ai-expert-d7f05f8571552250c8a5c3e9ce63f1c8.webp"],
];

for (const [slot, title, alt, filename] of assets) {
  const url = `https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/10/${filename}`;
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") || "image/webp";
  const asset = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id}', {slot});
  const doc = {
    _type: "siteAsset",
    slot,
    title,
    alt,
    image: {_type: "image", asset: {_type: "reference", _ref: asset._id}},
  };
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}
