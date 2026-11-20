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
  ["outsourcing-banner", "AI Outsourcing page hero", "AI development team collaborating on intelligent products", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/ai-outsourcing-banner-906da64ff57345a601bcf8807ad4e62d.webp"],
  ["outsourcing-trend", "AI outsourcing delivery", "AI experts planning an outsourced AI development engagement", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/ai-outsourcing-0ef7d71cc52d9ddee489697b720d3106.webp"],
  ["outsourcing-prompts", "Prompt engineering expertise", "Prompt engineering and generative AI development", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/prompt-engineering-surge-c999d5b6b8bab8662faae7fafe463f04.webp"],
  ["outsourcing-genai", "Generative AI in production", "Generative AI systems deployed in business workflows", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/genai-production-2cb7b2952964c4a2501a2a7afd6f0b48.webp"],
  ["outsourcing-industries", "AI outsourcing outcomes", "AI teams helping organizations deliver production AI", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/redefine-ai-outsourcing-110eed2c630aab0f3fa87d6473926732.webp"],
  ["outsourcing-process", "AI outsourcing process", "AI strategy, development, quality assurance, and deployment", "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2025/05/ai-outsourcing-0ef7d71cc52d9ddee489697b720d3106.webp"],
];

for (const [slot, title, alt, url] of assets) {
  const existing = await client.fetch('*[_type == "siteAsset" && slot == $slot][0]{_id, "assetId": image.asset._ref}', {slot});
  if (existing?._id && existing.assetId) {
    await client.patch(existing._id).set({title, alt}).commit({visibility: "sync"});
    console.log(`Reused ${slot} from Sanity.`);
    continue;
  }
  const response = await fetch(url, {headers: {"user-agent": "Kodrise website asset importer/1.0"}});
  if (!response.ok) throw new Error(`Could not download ${slot}: HTTP ${response.status}`);
  const filename = url.split("/").pop();
  const contentType = response.headers.get("content-type") || "image/webp";
  const uploaded = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {filename, contentType});
  const doc = {_type: "siteAsset", slot, title, alt, image: {_type: "image", asset: {_type: "reference", _ref: uploaded._id}}};
  if (existing?._id) await client.patch(existing._id).set(doc).commit({visibility: "sync"});
  else await client.create(doc, {visibility: "sync"});
  console.log(`Uploaded ${slot} to Sanity.`);
}

const pageKey = "/services/outsourcing-ai-development";
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/ai-outsourcing-page.json"), "utf8"));
const lines = (items) => items.map((item) => `${item.title} :: ${item.description}`).join("\n");
const pagePatch = {
  title: "AI Outsourcing",
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
    title: "AI Outsourcing | Kodrise",
    description: "Scale AI delivery with experienced engineers and flexible teams for strategy, development, integration, and ongoing support.",
  },
};
const page = await client.fetch('*[_type == "sitePage" && pageKey == $key][0]{_id}', {key: pageKey});
if (!page?._id) throw new Error(`The imported AI Outsourcing page record was not found in Sanity (${pageKey}).`);
const heroAsset = await client.fetch('*[_type == "siteAsset" && slot == "outsourcing-banner"][0]{"assetId":image.asset._ref}');
if (heroAsset?.assetId) pagePatch.heroImage = {_type: "image", asset: {_type: "reference", _ref: heroAsset.assetId}};
await client.patch(page._id).set(pagePatch).commit({visibility: "sync"});
console.log("Updated AI Outsourcing content and hero image in Sanity.");
