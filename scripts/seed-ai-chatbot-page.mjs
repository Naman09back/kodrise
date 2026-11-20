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
  ["ai-chatbot-banner", "AI Chatbot Development page hero", "Custom AI chatbot development", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/chatbot-banner-36ae52212c1baaea8c15ad4175e427bd.webp"],
  ["ai-chatbot-conversations", "AI chatbot conversation design", "AI chatbot conversation interface", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/gpt-4-b652b5ddf9bf8c630bd0c4f19b2e8d8b.webp"],
  ["ai-chatbot-knowledge", "AI chatbot knowledge and models", "Language model used in AI chatbot development", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/llama-model-e0661cebebef932699e87b44500d6f92.webp"],
  ["ai-chatbot-integrations", "AI chatbot integrations", "AI chatbot integrations and visual responses", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/dall-e-51ac771526c1909f0763cae561568011.webp"],
  ["ai-chatbot-security", "AI chatbot governance", "Secure AI chatbot deployment and controls", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-chatbot-process-829aee3f205ecc9965da7be3758f8ed6.webp"],
  ["ai-chatbot-industries", "AI chatbot industry applications", "AI chatbot development process and industry applications", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-chatbot-process-829aee3f205ecc9965da7be3758f8ed6.webp"],
  ["ai-chatbot-process", "AI chatbot development process", "Custom AI chatbot development process", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/07/custom-chatbot-process-829aee3f205ecc9965da7be3758f8ed6.webp"],
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

const pageKey = "/services/ai-chatbot-development-company";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/ai-chatbot-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "AI Chatbot Development",
  family: "AI Services",
  announcement: content.hero.eyebrow,
  heroTitle: content.hero.title,
  heroAccent: content.hero.accent,
  heroDescription: content.hero.description,
  primaryCta: content.hero.cta,
  primaryCtaUrl: content.hero.ctaUrl,
  detailSolutionsHeading: content.solutions.heading,
  detailSolutionsIntro: content.solutions.intro,
  detailSolutionsItems: lines(content.solutions.items),
  detailCapabilitiesHeading: content.capabilities.heading,
  detailCapabilitiesIntro: content.capabilities.intro,
  detailCapabilityItems: lines(content.capabilities.items),
  detailIndustriesIntro: content.industries.intro,
  detailIndustryItems: lines(content.industries.items),
  detailWhyIntro: content.why.intro,
  detailWhyItems: lines(content.why.items),
  detailCreativeHeading: content.creative.heading,
  detailCreativeIntro: content.creative.intro,
  detailCreativeItems: lines(content.creative.items),
  detailTechnologyIntro: content.technology.intro,
  detailTechnologyItems: content.technology.groups.map((group) => `${group.title} :: ${group.items.join(", ")}`).join("\n"),
  detailCaseStudiesIntro: content.caseStudiesIntro,
  detailFaqItems: content.faqs.map((item) => `${item.question} :: ${item.answer}`).join("\n"),
  seo: {
    title: "AI Chatbot Development Services | Kodrise",
    description: "Build secure AI chatbots that support customers, qualify leads, connect business systems, and automate conversations across channels.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported AI Chatbot page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "ai-chatbot-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated AI Chatbot Development content and hero image in Sanity.");
